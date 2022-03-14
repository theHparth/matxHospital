import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "Please provide address"],
      maxlength: 150,
    },
    contect: {
      type: String,
      required: [true, "Please provide contect"],
      maxlength: 10,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      maxlength: 150,
    },
    pincode: {
      type: Number,
      required: [true, "Please provide pincode"],
      maxlength: 150,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hospital", HospitalSchema);
