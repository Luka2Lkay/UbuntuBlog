require("module-alias/register");
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const mongoose = require("mongoose");
const Site = require("@/models/site_model");
const User = require("@/models/user_model");
const SiteMember = require("@/models/site_member_model");
const { db } = require("../config/db_config");

async function migrateSiteMemberships() {
  try {
    await mongoose.connect(db.connectionString);
    console.log("Connected to MongoDB");

    const sites = await Site.find();

    for (const site of sites) {
      const user = await User.findOne({ clerkId: site.userId });
      if (!user) {
        console.warn(
          `User not found for site ${site._id} with clerkId ${site.userId}`,
        );
        continue;
      }

      await SiteMember.findOneAndUpdate(
        { siteId: site._id, userId: user._id },
        { $setOnInsert: { role: "admin", active: true } },
        { upsert: true, returnDocument: "after" },
      );

      console.log(
        `Migrated site membership for site ${site.name} and user ${user.name}`,
      );
    }

    console.log("Site memberships migration completed successfully.");
  } catch (error) {
    console.error("Error migrating site memberships:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  }
}

migrateSiteMemberships();
