import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const Contact = new mongoose.model("Contact", contactSchema);
