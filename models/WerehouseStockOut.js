import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const StockOutSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: [true, "Please provide Hoapital Name"],
      maxlength: 150,
    },
    stock_name: {
      type: String,
      required: [true, "Please provide stock name"],
      maxlength: 100,
    },
    totalPrice: {
      type: Number,
      maxlength: 10000000,
    },
    TotalQtyInOneBox: {
      type: Number,
      maxlength: 10000000,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },

    totalBox: {
      type: Number,
      maxlength: 10000000,
    },
  },
  { timestamps: true }
);

export default mongoose.model("StockOut", StockOutSchema);
