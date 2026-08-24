const { getAuth } = require("@clerk/express");
const { errorMessages } = require("@/helpers/message_helpers");
const { uploadToCloudinary } = require("@/helpers/cloudinary");

const uploadImage = async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: errorMessages.notAuthorized });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No image file provided" });
  }

  try {
    const result = await uploadToCloudinary(req.file.buffer);
    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadImage };
