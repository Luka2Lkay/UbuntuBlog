const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      indexing: true,
    },
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
