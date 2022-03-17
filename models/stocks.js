import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const StockSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please provide Description"],
      maxlength: 100,
    },
    vendor_name: {
      type: String,
      required: [true, "Please select vendor"],
      maxlength: 100,
    },
    price: {
      type: String,
      required: [true, "Please add price"],
      maxlength: 100,
    },
    qty: {
      type: String,
      required: [true, "Please add Qty."],
      maxlength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stocks", StockSchema);
