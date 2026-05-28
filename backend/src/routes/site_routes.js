const express = require("express");
const { createSite, getSites } = require("../controllers/site_controller");
const { validateSiteCreation } = require("../middleware/validation");

const siteRoutes = (app) => {
  const router = express.Router();

  router.post("/sites", validateSiteCreation, createSite);
  router.get("/sites", getSites)

  app.use("/api", router);
};

module.exports = { siteRoutes };
