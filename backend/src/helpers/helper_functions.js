const User = require("@/models/user_model");
const Post = require("@/models/post_model");
const SiteMember = require("@/models/site_member_model");

const getUserSiteMemberships = async (userId) => {
  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const memberships = await SiteMember.find({
    userId: user._id,
    active: true,
  });

  return { user, memberships };
};

const buildPostFilter = ({ user, memberships, siteId }) => {
  const membership = memberships.find(
    (membership) => membership.siteId.toString() === siteId.toString(),
  );

  if (!membership) {
    const error = new Error("You don't have access to this site.");
    error.statusCode = 403;
    throw error;
  }

  if (membership.role === "admin") {
    return { site: siteId };
  }

  return { site: siteId, author: user.clerkId };
};

module.exports = { getUserSiteMemberships, buildPostFilter };
