const express = require("express");
const Message = require("../models/Message");

module.exports = (verifyToken) => {
  const router = express.Router();

  // ---------------------------------------------
  // POST → Save Contact Form Message
  // ---------------------------------------------
  router.post("/message", async (req, res) => {
    try {
      const msg = new Message(req.body);
      await msg.save();
      res.json({ success: true });
    } catch (err) {
      console.error("Message save error:", err);
      res.status(500).json({ error: "Failed to save message" });
    }
  });

  // ---------------------------------------------
  // GET → Fetch messages with pagination
  // /messages?page=1&limit=10
  // ---------------------------------------------
  router.get("/messages", verifyToken, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const total = await Message.countDocuments();
      const messages = await Message.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      res.json({
        page,
        totalPages: Math.ceil(total / limit),
        totalMessages: total,
        messages,
      });
    } catch (err) {
      console.error("Fetch error:", err);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // ---------------------------------------------
  // PATCH → Mark message as read/unread
  // ---------------------------------------------
  router.patch("/message/:id/read", verifyToken, async (req, res) => {
    try {
      const msg = await Message.findById(req.params.id);
      if (!msg) return res.status(404).json({ error: "Message not found" });

      msg.isRead = !msg.isRead; // Toggle read/unread
      await msg.save();

      res.json({ success: true, isRead: msg.isRead });
    } catch (err) {
      console.error("Read toggle error:", err);
      res.status(500).json({ error: "Failed to update message" });
    }
  });

  // ---------------------------------------------
  // DELETE → Remove message
  // ---------------------------------------------
  router.delete("/message/:id", verifyToken, async (req, res) => {
    try {
      const deleted = await Message.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Message not found" });

      res.json({ success: true });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  return router;
};
