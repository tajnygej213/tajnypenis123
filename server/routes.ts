import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Create order endpoint
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  // Get user orders
  app.get("/api/orders/:email", async (req, res) => {
    try {
      const orders = await storage.getOrderByEmail(req.params.email);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Check payment status
  app.get("/api/orders/:email/paid", async (req, res) => {
    try {
      const orders = await storage.getOrderByEmail(req.params.email);
      const paid = orders.some(o => o.status === "paid");
      res.json({ paid, orders: orders.filter(o => o.status === "paid") });
    } catch (error) {
      res.status(500).json({ error: "Failed to check payment status" });
    }
  });

  // Update order status
  app.patch("/api/orders/:id", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        res.status(400).json({ error: "Status required" });
        return;
      }
      const updated = await storage.updateOrderStatus(req.params.id, status);
      if (!updated) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  return httpServer;
}
