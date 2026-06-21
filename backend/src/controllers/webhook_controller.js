require("dotenv").config();
const { Webhook } = require("svix");
const User = require("../models/user_model");

const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

const clerkWebhook = async (req, res) => {
  try {
    const payload =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    if (!webhookSecret) {
      console.error("Webhook secret not configured");
      return res.status(500).json({ message: "Webhook secret not configured" });
    }

    const webhook = new Webhook(webhookSecret);
    const event = webhook.verify(payload, headers);

    const eventType = event.type;
    const data = event.data;

    console.log(`Processing webhook event: ${eventType}`);

    switch (eventType) {
      case "user.created":
        await User.create({
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        });
        console.log(`User created: ${data.id}`);
        break;
      case "user.updated":
        await User.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses?.[0]?.email_address || "",
            name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            imageUrl: data.image_url || "",
          },
          { new: true },
        );
        break;
      case "user.deleted":
        await User.findOneAndDelete({ clerkId: data.id });
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Webhook verification or processing error:", error.message);
    return res
      .status(500)
      .json({ message: "Webhook error", error: error.message });
  }
};

module.exports = { clerkWebhook };
