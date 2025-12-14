require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const verifyToken = require("./middleware/verifyToken");

// ROUTES
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project.routes");
const messageRoutes = require("./routes/message.routes");
const certificateRoutes = require("./routes/certificate.routes");

// -------------------------------------------------------------
// CREATE APP
// -------------------------------------------------------------
const app = express();

// -------------------------------------------------------------
// CORS CONFIG (LOCAL + RENDER)
// -------------------------------------------------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ravi-portfolio-u3e9.onrender.com",
    ],
    credentials: true,
  })
);

// -------------------------------------------------------------
// BODY PARSERS  ⭐ MUST COME BEFORE ROUTES
// -------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------------------------------------------------
// STATIC FILES (optional)
// -------------------------------------------------------------
app.use("/uploads", express.static("uploads"));

// -------------------------------------------------------------
// MONGO DB
// -------------------------------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// -------------------------------------------------------------
// CLOUDINARY CONFIG  ⭐ MUST COME BEFORE UPLOAD
// -------------------------------------------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------------------------------------------------
// MULTER
// -------------------------------------------------------------
const upload = multer({ storage: multer.memoryStorage() });

// -------------------------------------------------------------
// ✅ FILE UPLOAD ROUTE (KEEP THIS)
// -------------------------------------------------------------
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(base64File, {
      folder: "portfolio",
      public_id: uuidv4(),
    });

    console.log("CLOUDINARY UPLOAD RESULT:", result.secure_url); // ⭐ REQUIRED

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// -------------------------------------------------------------
// TEST ROUTE
// -------------------------------------------------------------
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working perfectly 🚀" });
});

// -------------------------------------------------------------
// AUTH ROUTES
// -------------------------------------------------------------
app.use("/api/admin", authRoutes);

// -------------------------------------------------------------
// MAIN API ROUTES
// -------------------------------------------------------------
app.use("/api", projectRoutes(verifyToken));
app.use("/api", messageRoutes(verifyToken));
app.use("/api", certificateRoutes(verifyToken));

// -------------------------------------------------------------
// START SERVER
// -------------------------------------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Test API: http://localhost:${PORT}/api/test`);
});
