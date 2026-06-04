const express = require("express");
const {
  createSite,
  getSites,
  deleteSite,
  editSite,
} = require("../controllers/site_controller");
const { validateSiteCreation } = require("../middleware/validation");

const siteRoutes = (app) => {
  const router = express.Router();

  router.post("/sites", validateSiteCreation, createSite);
  router.get("/sites", getSites);
  router.put("/sites/:siteId", validateSiteCreation, editSite);
  router.delete("/sites/:siteId", deleteSite);

  app.use("/api", router);
};

module.exports = { siteRoutes };
