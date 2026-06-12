const Post = require("../models/post_model");
const User = require("../models/user_model");
const { validationResult } = require("express-validator");
const { getAuth } = require("@clerk/express");
const slugify = require("slugify");

const createPost = async (req, res) => {
  const errors = validationResult(req);
  const { userId } = getAuth(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      published,
      seo,
      author,
      site,
      publishedAt,
    } = req.body;

    if (!title || !content || !site) {
      return res
        .status(400)
        .json({ message: "Title, content, and site are required." });
    }

    const postSlug = slugify(title, {
      lower: true,
      trim: true,
      strict: true,
    });

    const existingPost = await Post.findOne({ slug: postSlug });

    if (existingPost) {
      return res.status(409).json({ message: "Slug already exists." });
    }

    const user = await User.findOne({ clerkId: userId });
  } catch (error) {}
};

module.exports = { createPost };
