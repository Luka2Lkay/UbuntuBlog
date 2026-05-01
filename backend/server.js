require("dotenv").config();
const { clerkClient, clerkMiddleware, getAuth } = require("@clerk/express");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
  }),
);

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
  res.status(200).json({ message: "Molo!" });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
