import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const StockSchema = new mongoose.Schema(
  {
    stock_name: {
      type: String,
      required: [true, "Please provide stock name"],
    },
    description: {
      type: String,
      required: [true, "Please provide Description"],
    },
    minimumLimit: {
      type: Number,
      // required: [true, "Please provide minimum limit"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    price: {
      type: Number,
    },

    totalQtyInOneBox: {
      type: Number,
    },
    totalBox: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stocks", StockSchema);
