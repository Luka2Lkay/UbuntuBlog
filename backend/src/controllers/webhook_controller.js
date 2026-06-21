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

    console.log("data", data)

    // Helper function to generate user name with fallback
    const generateName = () => {
      const fullName = `${data.first_name || ""} ${data.last_name || ""}`.trim();
      if (fullName) return fullName;
      
      // Fallback to email if available
      const email = data.email_addresses?.[0]?.email_address;
      if (email) return email;
      
      // Final fallback to clerkId
      return data.id;
    };

    const name = generateName();
    const email = data.email_addresses?.[0]?.email_address || "";

    switch (eventType) {
      case "user.created":
        console.log(`[WEBHOOK] Creating user: ${data.id}, name: ${name}, email: ${email}`);
        await User.create({
          clerkId: data.id,
          email: email,
          name: name,
          imageUrl: data.image_url || "",
        });
        console.log(`[WEBHOOK] User created successfully: ${data.id}`);
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
    console.error("[WEBHOOK] ERROR:", error.message);
    console.error("[WEBHOOK] Full error:", error);
    return res.status(500).json({ message: "Webhook error", error: error.message });
  }
};

module.exports = { clerkWebhook };
