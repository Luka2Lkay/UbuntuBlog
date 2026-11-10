require("module-alias/register");
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const { clerkClient, clerkMiddleware, getAuth } = require("@clerk/express");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { db } = require("./src/config/db_config");

const { siteRoutes } = require("./src/routes/site_routes");
const { postRoutes } = require("./src/routes/post_routes");
const { uploadRoutes } = require("./src/routes/upload_routes");
const { clerkWebhook } = require("./src/controllers/webhook_controller");

app.use(cors());

app.post(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhook,
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  }),
);

const connectDB = async () => {
  try {
    await mongoose.connect(db.connectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

connectDB();

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
uploadRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
