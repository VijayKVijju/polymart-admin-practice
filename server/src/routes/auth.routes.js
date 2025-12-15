const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/auth.controller");

// POST /api/auth/login
console.log("vijay ")
router.post("/login", loginAdmin);
console.log("new------- ")

module.exports = router;
