const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload",
  verifyToken,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "portfolio",
          public_id: uuidv4(),
        }
      );

      // ⭐ THIS IS THE LOG YOU WERE LOOKING FOR
      console.log("CLOUDINARY UPLOAD RESULT:", result.secure_url);

      res.json({ url: result.secure_url });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

module.exports = router;
