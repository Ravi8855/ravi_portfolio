require("dotenv").config();
const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const projectRoutes = require("./routes/project.routes");
const messageRoutes = require("./routes/message.routes");
const certificateRoutes = require("./routes/certificate.routes");
const verifyToken = require("./middleware/verifyToken");

const app = express();

/*****************************************************************************************
 * ⭐⭐⭐ GLOBAL CORS FIX — REQUIRED FOR RENDER + VERCEL ⭐⭐⭐
 * Must be BEFORE ANY other middleware, routes, parsers.
 *****************************************************************************************/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
/*****************************************************************************************/


// JSON Body Parser
app.use(express.json());

// Serve static files (uploads)
app.use("/uploads", express.static("uploads"));


// ---------------------------------------------------------------------------------------
// MONGO CONNECTION
// ---------------------------------------------------------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


// ---------------------------------------------------------------------------------------
// JWT SECRET
// ---------------------------------------------------------------------------------------
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_fallback";


// ---------------------------------------------------------------------------------------
// CLOUDINARY CONFIG
// ---------------------------------------------------------------------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });


// ---------------------------------------------------------------------------------------
// IMAGE UPLOAD ROUTE
// ---------------------------------------------------------------------------------------
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
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});


// ---------------------------------------------------------------------------------------
// ROUTES — MUST COME AFTER CORS + JSON PARSER
// ---------------------------------------------------------------------------------------
app.use("/api", projectRoutes(verifyToken));
app.use("/api", messageRoutes(verifyToken));
app.use("/api", certificateRoutes(verifyToken));


// ---------------------------------------------------------------------------------------
// START SERVER
// ---------------------------------------------------------------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
