import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const StockHospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: [true, "Please provide hospital name"],
    },
    stock_name: {
      type: String,
      required: [true, "Please provide stock name"],
      maxlength: 100,
    },
    minimumLimit: {
      type: Number,
      // required: [true, "Please provide minimum limit"],
    },
    createdFor: {
      type: String,
      ref: "Hospital",
      required: [true, "Please provide hospital name"],
    },
    price: {
      type: Number,
    },
    totalQtyUser: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("StocksHospital", StockHospitalSchema);
