import Admin from "../models/admin_model.js";
import User from '../models/user_model.js'
// ================= REGISTER =================
export const registerAdmin = async (req, res) => {
  const { adminId, password } = req.body;


  console.table({adminId, password});

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

  console.table({adminId, password});

  const admin = await Admin.findOne({ adminId }).select("+password");
  console.log(admin)
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  console.log("11");

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


export const approveUser = async (req, res) => {
  const { userId } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { status: "Approved" },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ success: true, message: "User approved", user: updatedUser });
};

// =======================
// REJECT USER
// =======================
export const rejectUser = async (req, res) => {
  const { userId } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { status: "Rejected" },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ success: true, message: "User rejected", user: updatedUser });
}


// export const getListing = asyncHandler(async (req, res) => {
//   const listings = await Listing.find({ isAcknowledged: false })
//     .populate("user", "name mobileNumber")
//     .sort({ createdAt: -1 });
    
//   res.status(200).json({
//     success: true,
//     total: listings.length,
//     listings,
//   });
// });
export const getPendingUsers = async (req, res) => {
  const users = await User.find({ status: "Pending" }).sort({ createdAt: -1 });
  res.json({
    success: true,
    count: users.length,
    users,
  });
};