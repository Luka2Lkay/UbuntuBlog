const Post = require("../models/post_model");
const User = require("../models/user_model");
const { validationResult } = require("express-validator");
const { getAuth } = require("@clerk/express");
const slugify = require("slugify");
const { errorMessages } = require("../helpers/message_helpers");

const createPost = async (req, res) => {
  const errors = validationResult(req);
  const { userId } = getAuth(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notFound });
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
      return res.status(409).json({ message: errorMessages.exists("Slug") });
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ message: errorMessages.notFound("User") });
    }

    const post = await Post.create({
      title,
      slug: postSlug,
      excerpt: excerpt || content.replace(/<[^>]+>/g, "").substring(0, 200),
      content,
      featuredImage,
      category,
      tags: tags?.map((tag) => tag.trim().toLowerCase()) || [],
      pblished: Boolean(published),
      seo: {
        metaTitle: seo?.metaTitle || "",
        metaDescription: seo?.metaDescription || "",
        keywords:
          seo?.keywords.map((keyword) => keyword.trim().toLowerCase()) || [],
      },
      author: {
        clerkId: user.clerkId,
        name: user.firstName,
        imageUrl: user.imageUrl,
        email: user.email,
      },
      site,
      publishedAt: published ? new Date() : null,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
};

module.exports = { createPost };
