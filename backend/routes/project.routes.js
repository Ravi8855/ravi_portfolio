const express = require("express");
const Project = require("../models/Project");
const upload = require("../middleware/multer");
const cloudinary = require("../cloudinary");

module.exports = function (verifyToken) {
  const router = express.Router();

  // ✅ PUBLIC PROJECTS
  router.get("/", async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.json({ projects });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // ✅ CREATE PROJECT (ADMIN)
  router.post(
    "/",
    verifyToken,
    upload.single("image"),
    async (req, res) => {
      try {
        if (req.file) {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "projects" },
            async (error, result) => {
              if (error) throw error;

              const project = new Project({
                ...req.body,
                image: result.secure_url,
              });

              await project.save();
              res.json({ project });
            }
          );
          stream.end(req.file.buffer);
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

  return router;
};
