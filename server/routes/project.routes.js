// server/routes/project.routes.js
const express = require("express");
const Project = require("../models/Project");

module.exports = function (verifyToken) {
  const router = express.Router();

  // Public list
  router.get("/projects", async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.json({ projects });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // Create project (admin)
  router.post("/projects", verifyToken, async (req, res) => {
    try {
      const project = new Project(req.body);
      await project.save();
      res.json({ project });
    } catch (err) {
      res.status(500).json({ error: "Save failed" });
    }
  });

  // Update project
  router.put("/projects/:id", verifyToken, async (req, res) => {
    try {
      const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ project: updated });
    } catch (err) {
      res.status(500).json({ error: "Update failed" });
    }
  });

  // Delete project
  router.delete("/projects/:id", verifyToken, async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Delete failed" });
    }
  });

  return router;
};
