const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 300,
    required: true,
  },
  slug: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 300,
    lowercase: true,
    required: true,
    unique: true,
  },
  excerpt: { type: String, maxLength: 500, default: "" },
  content: { type: String, required: true },
  featuredImage: { type: String, default: "" },
  category: { type: String, trim: true, maxLength: 100, default: "" },
  tags: { type: [String], trim: true, lowercase: true, default: [] },
  published: { type: Boolean },
  seo: {
    metaTitle: { type: String, trim: true, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: [String], trim: true },
  },
  author: {
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  site: { type: mongoose.Schema.Types.ObjectId, ref: "Site", required: true },
  publishedAt: { type: Date, default: null },
  timestamp: true,
});

postSchema.plugin(uniqueValidator);

postSchema.pre("save", function (next) {
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

module.exports = mongoose.model("Post", postSchema);
