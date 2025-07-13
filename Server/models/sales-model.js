import mongoose from "mongoose"


const salesSchema = mongoose.Schema({
  email: {
    type: String,
    required : true
  },
  status: {
    type: Number,
    default: 0
  },
  reason: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    default: 0
  },
  receipt: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  }
},{timestamps: true})


export const Sale = new mongoose.model("Sale", salesSchema)