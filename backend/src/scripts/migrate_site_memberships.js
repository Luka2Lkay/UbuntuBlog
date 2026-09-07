require("module-alias/register");
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const mongoose = require("mongoose");
const Site = require("@/models/site_model");
const User = require("@/models/user_model");
const SiteMember = require("@/models/site_member_model");
const { db } = require("../config/db_config");

async function migrateSiteMemberships() {
  try {
    mongoose
      .connect(db.connectionString)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
      });

    const sites = await Site.find();

    for (const site of sites) {
      const user = await User.findOne({ clerkId: site.userId });

      console.log({ user });
      if (user) {
        const siteMember = new SiteMember({
          siteId: site._id,
          userId: user._id,
          role: "admin",
        });
        await siteMember.save();
      }
    }

    console.log("Site memberships migration completed successfully.");

    const siteMembers = await SiteMember.find();

    console.log("Site Members:", siteMembers);
  } catch (error) {
    console.error("Error migrating site memberships:", error);
  }
}

migrateSiteMemberships();
