// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const app = express();

// CORS CONFIG (your working setup)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Make uploaded files publicly accessible
app.use("/uploads", express.static("uploads"));


// ------------------------------------
// CONNECT MONGODB
// ------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// ------------------------------------
// JWT SECRET
// ------------------------------------
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_change_this";


// ------------------------------------
// VERIFY TOKEN (FIXED + SAFE FOR DEV)
// ------------------------------------
function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth)
    return res.status(401).json({ error: "Missing authorization header" });

  const [type, token] = auth.split(" ");
  if (type !== "Bearer" || !token)
    return res.status(401).json({ error: "Bad token format" });

  try {
    // ⭐ ALLOW FRONTEND FAKE TOKEN
    if (token === "sample-admin-token") {
      req.admin = { user: "dev-mode-admin" };
      return next();
    }

    // ⭐ USE REAL JWT VERIFY FOR REAL LOGIN
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}


// ------------------------------------
// ADMIN LOGIN (REAL JWT)
// ------------------------------------
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: "8h" });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});


// ------------------------------------
// CLOUDINARY CONFIG
// ------------------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });


// ------------------------------------
// IMAGE UPLOAD
// ------------------------------------
app.post("/api/upload", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64File, {
      folder: process.env.CLOUDINARY_FOLDER || "portfolio",
      public_id: uuidv4(),
    });

    res.json({
      url: result.secure_url,
      id: result.public_id,
      name: req.file.originalname,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({
      error: "Upload failed",
      details: err.message,
    });
  }
});


// ------------------------------------
// IMPORT ROUTES
// ------------------------------------
const projectRoutes = require("./routes/project.routes");
const messageRoutes = require("./routes/message.routes");
const certificateRoutes = require("./routes/certificate.routes");


// USE ROUTES
app.use("/api", projectRoutes(verifyToken));
app.use("/api", messageRoutes(verifyToken));
app.use("/api", certificateRoutes(verifyToken));


// ------------------------------------
// START SERVER
// ------------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
