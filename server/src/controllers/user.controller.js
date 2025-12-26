import ContactAndSupport from "../models/contact.model.js";


export const createContactMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if ( !message) {
      return res.status(400).json({
        success: false,
        message: "User and message are required",
      });
    }

    const newMessage = await ContactAndSupport.create({
         user: req.user._id, 
      message,
    });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactAndSupport.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
