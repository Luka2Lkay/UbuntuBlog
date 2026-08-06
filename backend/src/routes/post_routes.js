const express = require("express");
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
} = require("@/controllers/post_controller");
const { validatePostCreation } = require("@/middleware/validation");

const postRoutes = (app) => {
  const router = express.Router();

  router.post("/posts", validatePostCreation, createPost);
  router.get("/posts", getPosts);
  router.get("/posts/:postId", getPost);
  router.delete("/posts/:postId", deletePost);

  app.use("/api", router);
};

module.exports = { postRoutes };
