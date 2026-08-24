const express = require("express");
const { uploadImage } = require("@/controllers/upload_controller");
const { uploadSingleImage } = require("@/helpers/multer");

const uploadRoutes = (app) => {
  const router = express.Router();

  router.post("/upload/image", uploadSingleImage, uploadImage);

  app.use("/api", router);
};

module.exports = { uploadRoutes };
