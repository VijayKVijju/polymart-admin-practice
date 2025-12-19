import Admin from "../models/Admin.js";

// ================= REGISTER =================
export const registerAdmin = async (req, res) => {
  const { adminId, password } = req.body;

  if (!adminId || !password) {
    return res.status(400).json({ message: "AdminId & password required" });
  }

  const exists = await Admin.findOne({ adminId });
  if (exists) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const admin = await Admin.create({ adminId, password });

  res.status(201).json({
    success: true,
    message: "Admin registered",
    adminId: admin.adminId,
  });
};

// ================= LOGIN =================
export const loginAdmin = async (req, res) => {
  const { adminId, password } = req.body;

  const admin = await Admin.findOne({ adminId }).select("+password");
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = admin.generateAccessToken();

  res.json({
    success: true,
    message: "Login successful",
    token,
  });
};