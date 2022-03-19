import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const StockSchema = new mongoose.Schema(
  {
    stock_name: {
      type: String,
      required: [true, "Please provide stock name"],
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide Description"],
      maxlength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    totalPrice: {
      type: Number,
      maxlength: 10000000,
    },
    totalIndovisualPrice: {
      type: Number,
      maxlength: 10000000,
    },
    TotalQtyInOneBox: {
      type: Number,
      maxlength: 10000000,
    },
    totalBox: {
      type: Number,
      maxlength: 10000000,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stocks", StockSchema);
