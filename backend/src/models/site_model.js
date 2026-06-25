const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator").default;

const siteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 100,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 100,
      lowercase: true,
      required: true,
    },
    domain: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    niche: { type: String, trim: true, maxLength: 100, default: "" },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

siteSchema.index({ userId: 1, name: 1 }, { unique: true });
siteSchema.index({ userId: 1, domain: 1 }, { unique: true });

siteSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Site", siteSchema);
