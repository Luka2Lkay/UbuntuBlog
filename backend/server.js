require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const { clerkClient, clerkMiddleware, getAuth } = require("@clerk/express");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { db } = require("./src/config/db_config");

const { siteRoutes, postRoutes } = require("./src/routes/routes");
const { clerkWebhook } = require("./src/controllers/webhook_controller");

const ORIGIN = process.env.LIVE_URL || process.env.LOCAL_URL;

app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "PATCH", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.post(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhook,
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
  }),
);

mongoose
  .connect(db.connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});

app.get("/api/user", async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "UbuntuBlog's Server is running!" });
});

siteRoutes(app);
postRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
