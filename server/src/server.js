//===========================PROPER WORKIN=================
/*

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js";
import UserRoutes from "./routes/user.route.js";

dotenv.config();


connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/users", UserRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/listing", adminRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

*/

//----------------------------------NEW IMPLEMENTATION WORKING FINE FOR WEBSITE LISTING MANAGEMENT---------------------------------

/*
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.route.js";
import listingRoutes from "./routes/listings.routes.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/listings", listingRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
*/


//----------------------------------NEW IMPLEMENTATION to check api hitting-------------------
/*
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.route.js";
import listingRoutes from "./routes/listings.routes.js";


dotenv.config();
connectDB();

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Logging middleware to check API hits
app.use((req, res, next) => {
  console.log("====================================");
  console.log(`📌 API Hit: ${req.method} ${req.originalUrl}`);
  console.log(`🌐 From IP: ${req.ip}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("📥 Body:", req.body);
  }
  console.log("====================================");
  next();
});

// 🔹 Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/listings", listingRoutes);


const PORT = process.env.PORT || 5005;

// 🔹 Bind server to 0.0.0.0 to allow emulator & real devices to connect
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on 0.0.0.0:${PORT}`);
});
*/

//  ***********************TO IMPLEMENT BUYER INQUIRY *********************
/**
 * POLYMERMART API SERVER - Main Express application entry point
 * Connects MongoDB, registers models, applies middleware, and defines routes
 * Models must be imported BEFORE routes to prevent MissingSchemaError
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// ============================================
// IMPORT MODELS (BEFORE ROUTES!)
// Register all Mongoose models before they're referenced in controllers
// This prevents "Schema hasn't been registered" errors
// ============================================
import "./models/user_model.js";
import "./models/BuyerInquiry.model.js";
import "./models/Listing.model.js";

// ============================================
// IMPORT ROUTES
// ============================================
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.route.js";
import listingRoutes from "./routes/listings.routes.js";
import buyerInquiryRoute from "./routes/buyerInquiry.routes.js";

// ============================================
// INITIALIZE APP
// ============================================
dotenv.config();
connectDB();

const app = express();

// ============================================
// GLOBAL MIDDLEWARES
// ============================================
app.use(cors());
app.use(express.json());

// Request Logger - Logs all incoming API requests
app.use((req, res, next) => {
  console.log("====================================");
  console.log(`📌 API Hit: ${req.method} ${req.originalUrl}`);
  console.log(`🌐 From IP: ${req.ip}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("📥 Body:", req.body);
  }
  console.log("====================================");
  next();
});

// ============================================
// HEALTH CHECK ROUTES
// ============================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Polymermart API Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// API ROUTES
// ============================================
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/inquiries", buyerInquiryRoute);

// ============================================
// ERROR HANDLERS
// ============================================

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5005;

// Bind to 0.0.0.0 to allow connections from mobile emulators and real devices
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on 0.0.0.0:${PORT}`);
});