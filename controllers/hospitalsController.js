// import Hospital from "../models/Hospital.js";
// import { StatusCodes } from "http-status-codes";
// var passport = require("passport");
// Hospital = require("./../../models/hospital");
// const jwt = require("jsonwebtoken");

// const path = require("path");
// var nodemailer = require("nodemailer");
// const constants = require("../../config/constants");
// const fetch = require("node-fetch");
// var http = require("http");

// var transporter = nodemailer.createTransport({
//   service: constants.Constants.MAIL.SMTP_SERVICE,
//   secure: false,
//   port: 587,
//   auth: {
//     user: constants.Constants.MAIL.USER_NAME,
//     pass: constants.Constants.MAIL.PASSWORD,
//   },
// });

// import {
//   BadRequestError,
//   NotFoundError,
//   UnAuthenticatedError,
// } from "../errors/index.js";

// import checkPermissions from "../utils/checkPermissions.js";

// import mongoose from "mongoose";
// import moment from "moment";

import Hospital from "../models/Hospital.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const registerHospital = async (req, res) => {
  // const register = async (req, res) => {
  const { address, pincode, contect, email, hospitalName, password } = req.body;
  if (
    !address ||
    !pincode ||
    !contect ||
    !email ||
    !hospitalName ||
    !password
  ) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await Hospital.findOne({ hospitalName, email });
  // const userAlreadyExists = await Hospital.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email or Hospital name already exists");
  }

  const hospital = await Hospital.create({
    address,
    pincode,
    contect,
    email,
    hospitalName,
    password,
  });
  // req.body.createdBy = req.user.userId;
  res.status(StatusCodes.CREATED).json({ hospital });

  // const tokenHospital = hospital.createJWT();
  // res.status(StatusCodes.CREATED).json({
  //   user: {
  //     email: user.email,
  //     contect: user.contect,
  //     address: user.address,
  //     pincode: user.pincode,
  //   },
  //   tokenHospital,
  //   hospitalName: user.hospitalName,
  // });
};

// const addHospital = async (req, res) => {
//   Hospital.findOne({ email: req.body.email }, "email status", (err, user) => {
//     if (user) {
//       res.status(200).json({
//         status: false,
//         message: "An user with this email address already exist",
//         data: {},
//       });
//     } else {
//       Hospital.register(
//         new Hospital({
//           address: req.body.address,
//           email: req.body.email,
//           phone: req.body.phone,
//           name: req.body.name,
//           personcontact: req.body.personcontact,
//         }),
//         req.body.password,
//         function (err, userData) {
//           if (err) {
//             res
//               .status(200)
//               .json({ status: false, message: err.message, data: {} });
//           } else {
//             var newObj = {
//               id: userData.id,
//               email: userData.email,
//               phone: userData.phone,
//               personcontact: userData.personcontact,
//               created_at: userData.created_at,
//               updated_at: userData.updated_at,
//             };

//             passport.authenticate("local")(req, res, function () {
//               res.status(200).json({
//                 status: true,
//                 message: "Account created successfully",
//                 data: newObj,
//               });
//             });
//           }
//         }
//       );
//     }
//   });
// };
const getAllHospital = async (req, res) => {
  const { status, sort, search } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  //   if (status && status !== "all") {
  //     queryObject.status = status;
  //   }
  //   if (jobType && jobType !== "all") {
  //     queryObject.jobType = jobType;
  //   }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Hospital.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  //

  // setup pagination
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const skip = (page - 1) * limit;

  // result = result.skip(skip).limit(limit);

  const hospitals = await result;

  const totalHospitals = await Hospital.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalHospitals / limit);
  // numOfPages;
  res.status(StatusCodes.OK).json({ hospitals, totalHospitals });
};

const updateHospital = async (req, res) => {
  const { id: hospitalId } = req.params;

  const { address, pincode, contect, email, hospitalName } = req.body;

  if (!address || !pincode || !contect || !email || !hospitalName) {
    throw new BadRequestError("Please provide all values");
  }

  const hospital = await Hospital.findOne({ _id: hospitalId });

  if (!hospital) {
    throw new NotFoundError(`No job with id :${hospitalId}`);
  }
  const userAlreadyExists = await Hospital.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email is used");
  }
  const userAlreadyExistsUsername = await Hospital.findOne({ hospitalName });
  if (userAlreadyExistsUsername) {
    throw new BadRequestError("Username is already taken");
  }
  // check permissions

  checkPermissions(req.user, hospital.createdBy);

  const updatedHospital = await Hospital.findOneAndUpdate(
    { _id: hospitalId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedHospital });
};

const deleteHospital = async (req, res) => {
  const { id: hospitalId } = req.params;

  const hospital = await Hospital.findOne({ _id: hospitalId });

  if (!hospital) {
    throw new NotFoundError(`No job with id :${hospitalId}`);
  }

  checkPermissions(req.user, hospital.createdBy);

  await hospital.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

export { registerHospital, deleteHospital, getAllHospital, updateHospital };

// const showStats = async (req, res) => {
//   let stats = await Job.aggregate([
//     { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
//     { $group: { _id: "$status", count: { $sum: 1 } } },
//   ]);
//   stats = stats.reduce((acc, curr) => {
//     const { _id: title, count } = curr;
//     acc[title] = count;
//     return acc;
//   }, {});

//   const defaultStats = {
//     pending: stats.pending || 0,
//     interview: stats.interview || 0,
//     declined: stats.declined || 0,
//   };

//   let monthlyApplications = await Job.aggregate([
//     { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
//     {
//       $group: {
//         _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
//         count: { $sum: 1 },
//       },
//     },
//     { $sort: { "_id.year": -1, "_id.month": -1 } },
//     { $limit: 6 },
//   ]);
//   monthlyApplications = monthlyApplications
//     .map((item) => {
//       const {
//         _id: { year, month },
//         count,
//       } = item;
//       const date = moment()
//         .month(month - 1)
//         .year(year)
//         .format("MMM Y");
//       return { date, count };
//     })
//     .reverse();

//   res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
// };

function mailMembership(user) {
  var strTemplate = // '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><meta http-equiv="x-ua-compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"></head><body style="margin: 0px;padding: 0px;"><center><table width="100%" bgcolor="#ffffff" align="center" style="padding: 0px !important;"><tr><td align="center"><table class="mainTable" width="800" bgcolor="#000000" border="0" cellspacing="0" cellpadding="0" style="padding: 0px !important;"><tr><td class="header" align="center" style="padding: 90px 0 0 0;"><div style="height:10px"><a href="' +
    constants.Constants.MAIL.SITE_FRONT +
    '" title="exclusive vaults"><img class="headerLogo" src="' +
    constants.Constants.MAIL.SITE_PATH +
    '/images/exclusive-vaults-logo.png" alt="exclusive vaults" /></a></div></td></tr><tr><td><img src="' +
    constants.Constants.MAIL.SITE_PATH +
    '/images/bg1.png?v1.1.1" alt="bg1" style="width: 100% !important;height: auto !important;"></td></tr>';
  strTemplate += "<tr>";
  strTemplate += '<td class="conentMain" style="padding:0px 0px 50px 0px;">';
  strTemplate += '<div class="conentMainInner">';
  strTemplate +=
    '<h3 class="conTitle" style="font-family: \'Poppins\', sans-serif; font-size: 53px; font-weight:900; color: #ffffff; line-height:1.1; padding:0px 0px 30px; margin:0px;text-align: center;">Hi</h3>';
  strTemplate +=
    "<p style=\"display:block;font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 24px; line-height:1.1; color:#ffffff; margin:auto;text-align: center;width: 635px;\">Your Password is</p>";
  strTemplate += "</div>";
  strTemplate += "</div>";
  strTemplate += "</td>";
  strTemplate += "</tr>";
  strTemplate +=
    '</ul><hr style="display: block;height: 16px;width: 100%;border: 0px !important; margin: 0px !important;padding: 0px !important; background: linear-gradient(180deg, rgba(250,210,82,1) 29%,rgba(189,146,53,1) 48%,rgba(254,214,82,1) 71%) !important;"></td></tr></table></td></tr></table></center></body></html>';
  return strTemplate;
}
