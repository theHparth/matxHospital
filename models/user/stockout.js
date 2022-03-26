import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const stockOutSchema = new mongoose.Schema(
  {
    invoiceNum: {
      type: Number,
      required: [true, "Please provide Invoice number"],
    },
    hospitalName: {
      type: String,
      required: [true, "Please provide hospital name"],
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
      ref: "Hospital",
      required: [true, "Please provide created for"],
    },
    stockOutDetail: {
      type: Object,
      required: [true, "Please provide stock detal"],
    },
    // stock_name: {
    //   type: String,
    //   required: [true, "Please provide stock name"],
    //   maxlength: 100,
    // },
    // totalQtyInOneBox: {
    //   type: Number,
    //   required: [true, "Please provide number of qty in one box"],
    // },
    // totalBox: {
    //   type: Number,
    //   required: [true, "Please provide number of total box"],
    // },
    // priceForUser: {
    //   type: Number,
    // },
    // price: {
    //   type: Number,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("UserStock", stockOutSchema);
