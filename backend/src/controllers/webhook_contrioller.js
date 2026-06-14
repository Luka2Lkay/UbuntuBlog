require("dotenv").config();
const { Webhook } = require("svix");
const User = require("../models/user_model");

const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

const clerkWebhook = async (req, res) => {
  try {
    const payload = JSON.stringify(req.body);
  } catch (error) {
    return res.status(500).json({ message: "Webhook error" });
  }
};

module.exports = { clerkWebhook };
