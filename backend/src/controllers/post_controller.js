const Post = require("../models/post_model");
const { validationResult } = require("express-validator");
const { getAuth } = require("@clerk/express");
const { get } = require("mongoose");

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
  } catch (error) {}
};

module.exports = { createPost };
