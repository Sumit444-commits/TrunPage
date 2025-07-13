import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default :"https://i.pinimg.com/736x/b4/45/04/b44504dd1d8fbee2f4e5865179237571.jpg"
  },
});

export const Service = new mongoose.model("Service", serviceSchema);
