import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const WereHouseSchema = new mongoose.Schema(
  {
    stock_name: {
      type: String,
      required: [true, "Please provide stock name"],
      maxlength: 100,
    },
    stockTotoalPrice: {
      type: Number,
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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("WereHouseStocks", WereHouseSchema);
