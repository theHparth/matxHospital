import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const stockOutSchema = new mongoose.Schema(
  {
    hospitalName: {
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
    },
    totalQtyInOneBox: {
      type: Number,
      required: [true, "Please provide number of qty in one box"],
    },
    totalBox: {
      type: Number,
      required: [true, "Please provide number of total box"],
    },
    priceForUser: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: false,
      required: [true, "please add status its for programmer error"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    createdFor: {
      type: mongoose.Types.ObjectId,
      ref: "Hospital",
      required: [true, "Please provide created for"],
    },
    // createdFor: {
    //   type: String,
    //   ref: "Hospital",
    //   required: [true, "Please provide user"],
    // },
  },
  { timestamps: true }
);

export default mongoose.model("UserStock", stockOutSchema);
