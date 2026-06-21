require("dotenv").config();
const { Webhook } = require("svix");
const User = require("../models/user_model");

const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

const clerkWebhook = async (req, res) => {
  try {
    const payload = req.body.toString()

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const webhook = new Webhook(webhookSecret);

    const event = webhook.verify(payload, headers);

    const eventType = event.type;
    const data = event.data;

    switch (eventType) {
      case "user.created":
        await User.create({
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        });
        break;
      case "user.updated":
        await User.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses?.[0]?.email_address || "",
            name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            imageUrl: data.image_url || "",
          },
        );
        break;
      case "user.deleted":
        await User.findOneAndDelete({ clerkId: data.id });
        break;
    }

    return res.status(200).json({ message: "Webhook received successfully" });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ message: "Webhook error" });
  }
};

module.exports = { clerkWebhook };
