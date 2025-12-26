import mongoose from "mongoose";

const contactAndSupportSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  
);

export default mongoose.model("ContactAndSupport", contactAndSupportSchema);
