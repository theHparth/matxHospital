import Hospital from "../models/hospital.js";
import { StatusCodes } from "http-status-codes";

import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

import checkPermissions from "../utils/checkPermissions.js";

import mongoose from "mongoose";
import moment from "moment";

const addHospital = async (req, res) => {
  const { address, pincode, contect, email, hospitalName } = req.body;

  if (!address || !pincode || !contect || !email || !hospitalName) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExists = await Hospital.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email is used");
  }
  const userAlreadyExistsUsername = await Hospital.findOne({ hospitalName });
  if (userAlreadyExistsUsername) {
    throw new BadRequestError("Username is already taken");
  }
  req.body.createdBy = req.user.userId;

  const hospital = await Hospital.create(req.body);
  res.status(StatusCodes.CREATED).json({ hospital });
};

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

export { addHospital, deleteHospital, getAllHospital, updateHospital };

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
