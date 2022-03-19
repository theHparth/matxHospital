import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const stockOutSchema = new mongoose.Schema(
  {
    hospital_name: {
      type: String,
      required: [true, "Please provide stock name"],
      maxlength: 100,
    },
    stock_name: {
      type: String,
      required: [true, "Please provide stock name"],
      maxlength: 100,
    },
    price: {
      type: Number,
      maxlength: 100,
    },
    qty: {
      type: Number,
      required: [true, "Please add Qty."],
      maxlength: 100,
    },
    box: {
      type: Number,
      required: [true, "Please proide total Box."],
      maxlength: 100,
    },
    status: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    createdFor: {
      type: mongoose.Types.ObjectId,
      ref: "HospitaL",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserStock", stockOutSchema);
