const express = require("express");
const Certificate = require("../models/Certificate");

module.exports = (verifyToken) => {
  const router = express.Router();

  // Get all certificates
  router.get("/certificates", async (req, res) => {
    try {
      const certs = await Certificate.find().sort({ createdAt: -1 });
      res.json({ certificates: certs });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch certificates" });
    }
  });

  // Create certificate
  router.post("/certificates", verifyToken, async (req, res) => {
    try {
      const cert = new Certificate(req.body);
      await cert.save();
      res.json({ certificate: cert });
    } catch (err) {
      res.status(500).json({ error: "Failed to create certificate" });
    }
  });

  // Update certificate
  router.put("/certificates/:id", verifyToken, async (req, res) => {
    try {
      const updated = await Certificate.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json({ certificate: updated });
    } catch (err) {
      res.status(500).json({ error: "Failed to update certificate" });
    }
  });

  // Delete certificate
  router.delete("/certificates/:id", verifyToken, async (req, res) => {
    try {
      await Certificate.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete certificate" });
    }
  });

  return router;
};
