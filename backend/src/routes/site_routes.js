const express = require("express");
const { createSite } = require("../controllers/site_controller");
const { validateSiteCreation } = require("../middleware/validation");

const siteRoutes = (app) => {
  const router = express.Router();

  router.post("/sites", validateSiteCreation, createSite);

  app.use("/api", router);
};

module.exports = { siteRoutes };
