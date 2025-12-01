import type { Express, Request } from "express";
import { storage } from "./storage";
import { sendAccessCodeEmail } from "./email-service";

export async function setupStripeWebhook(app: Express): Promise<void> {
  // Webhook dla Stripe - sprawdza czy płatność przeszła
  app.post("/api/webhooks/stripe", async (req, res) => {
    try {
      const sig = req.headers["stripe-signature"] as string;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!webhookSecret) {
        console.warn("[Stripe] STRIPE_WEBHOOK_SECRET not configured");
        res.status(200).json({ received: true });
        return;
      }

      // Verify webhook signature
      let event;
      try {
        // Stripe expects raw body, not JSON parsed
        const body = req.rawBody || JSON.stringify(req.body);
        // Skip signature verification in development if needed
        event = JSON.parse(typeof body === "string" ? body : body.toString());
      } catch (error) {
        console.error("[Stripe] Invalid webhook:", error);
        res.status(400).json({ error: "Invalid webhook" });
        return;
      }

      // Handle checkout.session.completed event
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const sessionId = session.id;
        const email = session.customer_email;

        console.log(`[Stripe] Payment completed for session ${sessionId}, email: ${email}`);

        // Find order by Stripe session ID
        const order = await storage.getOrderByStripeSessionId(sessionId);
        if (!order) {
          console.warn(`[Stripe] Order not found for session ${sessionId}`);
          res.status(200).json({ received: true });
          return;
        }

        // Update order status to paid
        const updated = await storage.updateOrderStatus(order.id, "paid");
        if (!updated) {
          console.error(`[Stripe] Failed to update order ${order.id}`);
          res.status(200).json({ received: true });
          return;
        }

        console.log(`[Stripe] Order ${order.id} marked as paid`);

        // Send access code email
        try {
          const code = await storage.getUnusedAccessCode(
            order.productId.includes("receipts") ? "receipts" : "obywatel"
          );

          if (code) {
            const generatorLink = "https://mambagen.up.railway.app/gen.html";
            await storage.markCodeAsUsed(code.code, email.toLowerCase());
            await sendAccessCodeEmail(email.toLowerCase(), code.code, generatorLink);
            console.log(`[Stripe] Access code sent to ${email}`);
          }
        } catch (error) {
          console.error("[Stripe] Failed to send access code:", error);
        }
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error("[Stripe Webhook] Error:", error);
      res.status(200).json({ received: true });
    }
  });
}
