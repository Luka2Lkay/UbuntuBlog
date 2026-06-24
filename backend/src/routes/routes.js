const express = require("express");
const {
  createSite,
  getSites,
  deleteSite,
  editSite,
  getSite,
} = require("../controllers/site_controller");

const { createPost } = require("../controllers/post_controller");

const { validatePostCreation } = require("../middleware/validation");
const { validateSiteCreation } = require("../middleware/validation");

const siteRoutes = (app) => {
  const router = express.Router();

  router.post("/sites", validateSiteCreation, createSite);
  router.get("/sites", getSites);
  router.patch("/sites/:siteId", editSite);
  router.delete("/sites/:siteId", deleteSite);
  router.get("/sites/:siteId", getSite);

  app.use("/api", router);
};

const postRoutes = (app) => {
  const router = express.Router();

  router.post("/posts", validatePostCreation, createPost);

  app.use("/api", router);
};

module.exports = { siteRoutes, postRoutes };
