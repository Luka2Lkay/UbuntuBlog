const Site = require("../models/site_model");
const { validationResult } = require("express-validator");

const createSite = async (req, res) => {
  const errors = validationResult(req);
  const clerkId = req.auth.userId;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!clerkId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { name, slug, domain, niche } = req.body;
    const site = new Site({ name, slug, domain, niche, clerkId });
    await site.save();
    res.status(201).json(site);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createSite };
