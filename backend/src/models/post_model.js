const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator").default;

const postSchema = new mongoose.Schema(
  {
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
    },
    excerpt: { type: String, maxLength: 500, default: "" },
    content: { type: String, required: true },
    featuredImage: { type: String, default: "" },
    category: { type: String, trim: true, maxLength: 100, default: "" },
    tags: { type: [String], trim: true, lowercase: true, default: [] },
    published: { type: Boolean, default: false },
    seo: {
      metaTitle: { type: String, trim: true, default: "" },
      metaDescription: { type: String, default: "" },
      keywords: { type: [String], trim: true },
    },
    author: {
      type: String,
      index: true,
      required: true,
    },
    site: { type: mongoose.Schema.Types.ObjectId, ref: "Site", required: true },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

postSchema.plugin(uniqueValidator);

postSchema.index({ slug: 1, site: 1 }, { unique: true });
postSchema.index({
  title: "text",
  excerpt: "text",
  content: "text",
  tags: "text",
});
postSchema.index({ published: 1, publishedAt: -1 });

postSchema.pre("save", function () {
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

module.exports = mongoose.model("Post", postSchema);
