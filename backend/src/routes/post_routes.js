const express = require("express");
const { createPost } = require("@/controllers/post_controller");
const { validatePostCreation } = require("@/middleware/validation");

const postRoutes = (app) => {
  const router = express.Router();

  router.post("/posts", validatePostCreation, createPost);

  app.use("/api", router);
};

module.exports = { postRoutes };
