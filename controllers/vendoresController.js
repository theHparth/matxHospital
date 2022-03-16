import vendors from "../models/Vendor.js";
import { StatusCodes } from "http-status-codes";

import { BadRequestError, NotFoundError } from "../errors/index.js";

import checkPermissions from "../utils/checkPermissions.js";

const addVendor = async (req, res) => {
  const { fname, address, pincode, contect, email } = req.body;

  if (!fname || !address || !pincode || !contect || !email) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;

  const vendor = await vendors.create(req.body);
  res.status(StatusCodes.CREATED).json({ vendor });
};

const getAllVendor = async (req, res) => {
  const { status, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = vendors.find(queryObject);
  // console.log(result + "===========");
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

  const vendorList = await result;
  // console.log(vendorData);
  // const totalVendors = await vendors.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalVendors / limit);
  // console.log(totalVendors);
  res.status(StatusCodes.OK).json({ vendorList });
};

const updateVendor = async (req, res) => {
  const { id: VendorId } = req.params;

  const { fname, address, pincode, contect, email } = req.body;

  if (!fname || !address || !pincode || !contect || !email) {
    throw new BadRequestError("Please provide all values");
  }

  const vendor = await vendors.findOne({ _id: VendorId });

  if (!vendor) {
    throw new NotFoundError(`No job with id :${VendorId}`);
  }
  // check permissions

  checkPermissions(req.user, vendor.createdBy);

  const updatedVendor = await vendors.findOneAndUpdate(
    { _id: VendorId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedVendor });
};

const deleteVendor = async (req, res) => {
  const { id: vendorId } = req.params;

  const vendor = await vendors.findOne({ _id: vendorId });

  if (!vendor) {
    throw new NotFoundError(`No job with id :${vendorId}`);
  }

  checkPermissions(req.user, vendor.createdBy);

  await vendor.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

export { addVendor, deleteVendor, getAllVendor, updateVendor };
