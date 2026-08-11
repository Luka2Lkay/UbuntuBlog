const Post = require("@/models/post_model");
const User = require("@/models/user_model");
const Site = require("@/models/site_model");
const { validationResult } = require("express-validator");
const { getAuth } = require("@clerk/express");
const slugify = require("slugify");
const { errorMessages } = require("@/helpers/message_helpers");

const createPost = async (req, res) => {
  const errors = validationResult(req);
  const { userId } = getAuth(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  try {
    const {
      title,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      published,
      seo,
      site,
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
      published: Boolean(published),
      seo: {
        metaTitle: seo?.metaTitle || "",
        metaDescription: seo?.metaDescription || "",
        keywords:
          seo?.keywords?.map((keyword) => keyword.trim().toLowerCase()) || [],
      },
      author: user.clerkId,
      site,
      publishedAt: published ? new Date() : null,
    });

    return res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  if (!postId) {
    return res.status(404).json({ message: errorMessages.missingId("Post") });
  }

  try {
    const post = await Post.findById(postId);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  const { userId } = getAuth(req);
  const { site } = req.query;

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  try {
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ message: errorMessages.notFound("User") });
    }

    const filter = { author: user.clerkId };

    if (site) {
      const siteDocument = await Site.findOne({ slug: site });

      if (!siteDocument) {
        return res.status(404).json({ message: "Site not found" });
      }

      filter.site = siteDocument._id;
    }

    const posts = await Post.find(filter);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  if (!postId) {
    return res.status(404).json({ message: errorMessages.missingId("Post") });
  }

  try {
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "The post has been deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPost, getPosts, deletePost };
