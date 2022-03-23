import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const WereHouseSchema = new mongoose.Schema(
  {
    stock_name: {
      type: String,
      required: [true, "Please provide stock name"],
      maxlength: 100,
    },
    vendor_name: {
      type: String,
      required: [true, "Please select vendor"],
      maxlength: 100,
    },

    price: {
      type: Number,
      required: [true, "Please add price"],
    },

    totalQtyInOneBox: {
      type: Number,
      required: [true, "Please provide number of qty in one box"],
    },
    totalBox: {
      type: Number,
      required: [true, "Please provide number of total box"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("WereHouseStocks", WereHouseSchema);
