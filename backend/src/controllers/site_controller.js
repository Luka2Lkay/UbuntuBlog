const Site = require("../models/site_model");
const { validationResult } = require("express-validator");
const { getAuth } = require("@clerk/express");
const { errorMessages } = require("@/helpers/message_helpers");
const User = require("@/models/user_model");

const createSite = async (req, res) => {
  const errors = validationResult(req);
  const { userId } = getAuth(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  try {
    const { name, slug, domain, niche } = req.body;
    const site = new Site({ name, slug, domain, niche, userId });
    await site.save();
    res.status(201).json(site);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(409).json({
        message: "You already have a site with these details.",
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];

      return res.status(400).json({
        message: `${field} already exists`,
      });
    }

    res.status(500).json({ message: error.message });
  }
};

const editSite = async (req, res) => {
  const { userId } = getAuth(req);
  const { siteId } = req.params;

  if (!siteId) {
    return res.status(400).json({ message: errorMessages.missingId("Site") });
  }

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  try {
    const updateSite = await Site.findByIdAndUpdate(siteId, req.body, {
      returnDocument: "after",
    });

    if (!updateSite) {
      return res.status(404).json({ message: errorMessages.notFound("Site") });
    }
    res.status(200).json(updateSite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSites = async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  try {
    const user = await User.findOne({ clerkId: userId });

    const sites = (await Site.find()).filter(
      (site) => site.userId === user.clerkId,
    );

    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserSites = async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  try {
    // const sites = await Site.
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSite = async (req, res) => {
  const { userId } = getAuth(req);
  const { siteId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  if (!siteId) {
    return res.status(400).json({ message: errorMessages.missingId("Site") });
  }

  try {
    const site = await Site.findById(siteId);

    res.status(200).json({ site });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSite = async (req, res) => {
  const { userId } = getAuth(req);
  const { siteId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  if (!siteId) {
    return res.status(400).json({ message: errorMessages.missingId("Site") });
  }

  try {
    await Site.findByIdAndDelete(siteId);

    res.status(200).json({ message: "Site deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSite,
  getSites,
  deleteSite,
  editSite,
  getSite,
  getUserSites,
};
