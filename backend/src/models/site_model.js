const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
      unique: true,
    },
    domain: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    niche: { type: String, trim: true, maxLength: 100, default: "" },
    clerkId: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

siteSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Site", siteSchema);
