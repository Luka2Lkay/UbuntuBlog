const mongoose = require("mongoose");

const siteMemberSchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    role: { type: String, enum: ["admin", "author"], default: "author" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

siteMemberSchema.index({ siteId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("SiteMember", siteMemberSchema);
