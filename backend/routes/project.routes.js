// backend/routes/project.routes.js
const express = require("express");
const Project = require("../models/Project");
const upload = require("../middleware/multer");
const cloudinary = require("../cloudinary");

module.exports = function (verifyToken) {
  const router = express.Router();

  // ---------------- PUBLIC ----------------
  // GET /api/projects
  router.get("/", async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.json({ projects });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // ---------------- CREATE (ADMIN) ----------------
  // POST /api/projects
  router.post(
    "/",
    verifyToken,
    upload.single("image"),
    async (req, res) => {
      try {
        let imageUrl = "";

        if (req.file) {
          cloudinary.uploader.upload_stream(
            { folder: "projects" },
            async (error, result) => {
              if (error) return res.status(500).json({ error: "Upload failed" });

              const project = new Project({
                ...req.body,
                image: result.secure_url,
              });

              await project.save();
              res.json({ project });
            }
          ).end(req.file.buffer);
        } else {
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
  // PUT /api/projects/:id
  router.put("/:id", verifyToken, async (req, res) => {
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
  // DELETE /api/projects/:id
  router.delete("/:id", verifyToken, async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Delete failed" });
    }
  });

  return router;
};
