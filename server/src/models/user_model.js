  import mongoose from "mongoose";
  import jwt from "jsonwebtoken";

  // =========================
  // COUNTER SCHEMA (AUTO-ID)
  // =========================
  const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
  });

  const Counter = mongoose.model("Counter", counterSchema);

  // =========================
  // USER SCHEMA
  // =========================
  const userSchema = new mongoose.Schema({
    _id: { type: Number },  

    name: {
      type: String,
      trim: true,
      default: "New User",
      index: true
    },

    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    role: {
      type: String,
      enum: ["Buyer", "Seller"],
      required: true
      
    },

    gstDocumentUrl: {
      type: String,
      required: false,
      default: ""
    },

    location: {
      type: String,
      default: ""
    },

    profileImage: {
      type: String,
      default: "https://example.com/default-avatar.png"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },

    lastActive: {
      type: Date,
      default: Date.now
    },

    refreshToken: {
      type: String,
      default: ""
    }
  });

  // =========================
  // PROPER INDEXES
  // =========================
  userSchema.index({ mobileNumber: 1 }, { unique: true });
  userSchema.index({ name: 1 });


  userSchema.pre("save", async function () {
    if (this.isNew) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: "userId" },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );

        this._id = counter.seq;

      } catch (error) {
        throw new Error(`Failed to generate sequential ID: ${error.message}`);
      }
    }
  });

  // =========================
  // EXTRA USER METHODS
  // =========================
  userSchema.methods.setActive = function (status) {
    this.isActive = status;
    if (status) {
      this.lastActive = Date.now();
    }
    return this.save();
  };

  userSchema.methods.isOnline = function () {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return this.isActive && this.lastActive > fiveMinutesAgo;
  };

  userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        mobileNumber: this.mobileNumber,
        role: this.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    );
  };

  userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
    );
  };

  export default mongoose.model("User", userSchema);
