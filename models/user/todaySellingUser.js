import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const todaySellingHospitalSchema = new mongoose.Schema(
  {
    stock_name: {
      type: String,
      required: [true, "Please provide stock name"],
      maxlength: 100,
    },
    totalQtyInOneBox: {
      type: Number,
      required: [true, "Please provide number of qty in one box"],
    },
    totalBox: {
      type: Number,
      required: [true, "Please provide number of total box"],
    },
    sellingPriceTotal: {
      type: Number,
    },
    createdFor: {
      type: mongoose.Types.ObjectId,
      ref: "Hospital",
      required: [true, "Please provide created for"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "TodaySellingHospital",
  todaySellingHospitalSchema
);
