require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const app = express();

// ⭐⭐⭐ IMPORTANT — PLACE HERE — TOP OF FILE ⭐⭐⭐
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});
// ⭐⭐⭐ END OF GLOBAL CORS FIX ⭐⭐⭐

// Body parsing
app.use(express.json());

// Static files
app.use("/uploads", express.static("uploads"));

// Connect MongoDB...
// JWT setup...
// Cloudinary config...
// Upload route...

// ROUTES — MUST COME AFTER CORS & JSON
app.use("/api", projectRoutes(verifyToken));
app.use("/api", messageRoutes(verifyToken));
app.use("/api", certificateRoutes(verifyToken));

// Start server...
