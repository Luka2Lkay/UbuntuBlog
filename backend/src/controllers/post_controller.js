const Post = require("@/models/post_model");
const User = require("@/models/user_model");
const Site = require("@/models/site_model");
const SiteMember = require("@/models/site_member_model");
const { validationResult } = require("express-validator");
const { getAuth } = require("@clerk/express");
const slugify = require("slugify");
const { errorMessages } = require("@/helpers/message_helpers");
const { uploadToCloudinary } = require("@/helpers/cloudinary");
const DOMpurify = require("isomorphic-dompurify");

const createPost = async (req, res) => {
  const errors = validationResult(req);
  const { userId } = getAuth(req);
  const { site } = req.query;

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
      category,
      tags,
      published,
      seo,
      featured,
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

    const siteDocument = await Site.findOne({ slug: site });

    if (!siteDocument) {
      return res.status(404).json({ message: errorMessages.notFound("Site") });
    }

    const existingPost = await Post.findOne({
      slug: postSlug,
      site: siteDocument._id,
    });

    if (existingPost) {
      return res.status(409).json({ message: errorMessages.exists("Slug") });
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ message: errorMessages.notFound("User") });
    }

    const cloudinaryImage = req.file
      ? await uploadToCloudinary(req.file.buffer, siteDocument.slug)
      : null;

    const featuredImage = cloudinaryImage
      ? { url: cloudinaryImage.secure_url, publicId: cloudinaryImage.public_id }
      : null;

    const cleanText = DOMpurify.sanitize(content, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });

    const words = cleanText.split(/\s/g);
    const wordCount = words.length;
    const time = Math.ceil(wordCount / 200);

    const readTime = `${time} min read`;

    const post = await Post.create({
      title,
      slug: postSlug,
      excerpt: excerpt || cleanText.substring(0, 200),
      content,
      featuredImage,
      category,
      tags: tags?.map((tag) => tag.trim().toLowerCase()) || [],
      published,
      featured,
      wordCount,
      readTime,
      seo: {
        metaTitle: seo?.metaTitle || "",
        metaDescription: seo?.metaDescription || "",
        keywords:
          seo?.keywords?.map((keyword) => keyword.trim().toLowerCase()) || [],
      },
      author: user.clerkId,
      site: siteDocument._id,
      publishedAt: published ? new Date() : null,
    });

    return res.status(201).json(post);
  } catch (error) {
    if (error.code === "11000") {
      return res.status(409).json({ message: errorMessages.exists("Slug") });
    }
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

  try {
    if (!userId) {
      if (!site) {
        return res.status(400).json({ message: "Site slug is required" });
      }

      const siteDocument = await Site.findOne({ slug: site });

      if (!siteDocument) {
        return res.status(404).json({ message: "Site not found" });
      }

      const posts = await Post.find({
        site: siteDocument._id,
        published: true,
      }).sort({ createdAt: -1 });

      res.status(200).json(posts);
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ message: errorMessages.notFound("User") });
    }

    const memberships = await SiteMember.find({
      userId: user._id,
      active: true,
    });

    if (!memberships.length) {
      return res.status(200).json([]);
    }

    if (site) {
      const siteDocument = await Site.findOne({ slug: site });

      if (!siteDocument) {
        return res.status(404).json({ message: "Site not found" });
      }

      const membership = memberships.find(
        (membership) =>
          membership.siteId.toString() === siteDocument._id.toString(),
      );

      if (!membership) {
        return res
          .status(403)
          .json({ message: "You don't have access to this site." });
      }

      if (membership.role === "admin") {
        const posts = await Post.find({ site: siteDocument._id }).sort({
          createdAt: -1,
        });
        res.status(200).json(posts);
      }

      const posts = await Post.find({
        site: siteDocument._id,
        author: user.clerkId,
      });

      res.status(200).json(posts);
    }

    const adminSiteIds = memberships
      .filter((membership) => membership.role === "admin")
      .map((membership) => membership.siteId);
    const authorSiteIds = memberships
      .filter((membership) => membership.role === "author")
      .map((membership) => membership.siteId);

    const posts = await Post.find({
      $or: [
        { site: { $in: adminSiteIds } },
        { site: { $in: authorSiteIds }, author: user.clerkId },
      ],
    }).sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editPost = async (req, res) => {
  const errors = validationResult(req);
  const { userId } = getAuth(req);
  const { postId } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  if (!postId) {
    return res.status(404).json({ message: errorMessages.missingId("Post") });
  }

  try {
    const post = await Post.findOne({ _id: postId, author: userId });

    if (!post) {
      return res.status(404).json({ message: errorMessages.notFound("Post") });
    }

    const {
      title,
      excerpt,
      content,
      category,
      tags,
      published,
      seo,
      featured,
    } = req.body;

    const cleanText = DOMpurify.sanitize(content, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });

    const words = cleanText.split(/\s/g);
    const wordCount = words.length;
    const time = Math.ceil(wordCount / 200);

    const readTime = `${time} min read`;

    post.title = title;
    post.slug = slugify(title, { lower: true, trim: true, strict: true });
    post.excerpt = excerpt || cleanText.substring(0, 200);
    post.content = content;
    post.featured = featured;
    post.wordCount = wordCount;
    post.readTime = readTime;
    post.category = category;
    post.tags = tags?.map((tag) => tag.trim().toLowerCase()) || [];
    post.published = published;
    post.seo = {
      metaTitle: seo?.metaTitle || "",
      metaDescription: seo?.metaDescription || "",
      keywords:
        seo?.keywords?.map((keyword) => keyword.trim().toLowerCase()) || [],
    };

    if (published && !post.publishedAt) {
      post.publishedAt = new Date();
    } else if (!published) {
      post.publishedAt = null;
    }

    if (req.file) {
      const cloudinaryImage = await uploadToCloudinary(req.file.buffer);
      post.featuredImage = {
        url: cloudinaryImage.secure_url,
        publicId: cloudinaryImage.public_id,
      };
    }

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    if (error.code === "11000") {
      return res.status(409).json({ message: errorMessages.exists("Slug") });
    }
    return res.status(500).json({ message: error.message });
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

module.exports = { createPost, getPost, getPosts, editPost, deletePost };
