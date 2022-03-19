import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const HospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: [true, "Please provide Hoapital Name"],
      maxlength: 150,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      select: false,
    },
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
      maxlength: 5,
    },
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "Please provide user"],
    // },
  },
  { timestamps: true }
);

HospitalSchema.pre("save", async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

HospitalSchema.methods.createJWT = function () {
  return jwt.sign({ hospitalId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

HospitalSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("Hospital", HospitalSchema);

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

// const HospitalSchema = new mongoose.Schema(
//   {
//     personcontact: {
//       type: String,
//     },
//     email: {
//       type: String,
//       required: "hospital email is required.",
//     },
//     phone: {
//       type: String,
//     },
//     password: {
//       type: String,
//     },
//     address: {
//       type: String,
//     },
//     status: {
//       type: Number,
//       default: 1,
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     image: String,
//   },
//   { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
// );

// HospitalSchema.plugin(passportLocalMongoose, { usernameField: "email" });

// // HospitalSchema.path('email').validate((val) => {
// //     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// //     return emailRegex.test(val);
// // }, 'Invalid e-mail.');

// HospitalSchema.query.byStatus = function (sCode) {
//   return this.where({ status: sCode });
// };

// module.exports = mongoose.model("Hospital", HospitalSchema);
