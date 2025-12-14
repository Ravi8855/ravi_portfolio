// server/routes/project.routes.js
const express = require("express");
const Project = require("../models/Project");
const upload = require("../middleware/multer");
const cloudinary = require("../cloudinary");

module.exports = function (verifyToken) {
  const router = express.Router();

  // ---------------- PUBLIC ----------------
  router.get("/projects", async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.json({ projects });
    } catch {
      res.status(500).json({ error: "Server error" });
    }
  });

  // ---------------- CREATE (ADMIN) ----------------
  router.post(
    "/projects",
    verifyToken,
    upload.single("image"), // ✅ IMPORTANT
    async (req, res) => {
      try {
        let imageUrl = "";

        if (req.file) {
          const uploadResult = await cloudinary.uploader.upload_stream(
            { folder: "projects" },
            async (error, result) => {
              if (error) throw error;

              imageUrl = result.secure_url;

              const project = new Project({
                ...req.body,
                image: imageUrl,
              });

              await project.save();
              res.json({ project });
            }
          );

          uploadResult.end(req.file.buffer);
        } else {
          // No image → still allow project
          const project = new Project(req.body);
          await project.save();
          res.json({ project });
        }
      } catch (err) {
        res.status(500).json({ error: "Save failed" });
      }
    }
  );

  // ---------------- UPDATE ----------------
  router.put("/projects/:id", verifyToken, async (req, res) => {
    try {
      const updated = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json({ project: updated });
    } catch {
      res.status(500).json({ error: "Update failed" });
    }
  });

  // ---------------- DELETE ----------------
  router.delete("/projects/:id", verifyToken, async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Delete failed" });
    }
  });

  return router;
};
