const Site = require("../models/site_model");
const { validationResult } = require("express-validator");
const { getAuth } = require("@clerk/express");

const createSite = async (req, res) => {
  const errors = validationResult(req);
  const { userId } = getAuth(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { name, slug, domain, niche } = req.body;
    const site = new Site({ name, slug, domain, niche, userId });
    await site.save();
    res.status(201).json(site);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSites = async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const sites = await Site.find();
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSite, getSites };
