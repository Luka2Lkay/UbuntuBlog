const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      indexing: true,
    },
    firstName: {
      type: String,
      trim: true,
      default: "",
    },
    lastName: { type: String, trim: true, default: "" },
    imageUrl: { type: String, default: "" },
    role: { type: String, enum: ["admin", "author"], default: "author" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
