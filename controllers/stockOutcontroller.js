import UserStock from "../models/User/stockOut.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const sendStockUser = async (req, res) => {
  var { hospitalName, stock_name, qty, box, status } = req.body;
  // here you can remove vendor_id
  console.log(hospitalName, stock_name, qty, box, status);

  if (!hospitalName || !stock_name || !qty || !box) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;
  req.body.createdFor = hospitalName;

  const stock = await UserStock.create(req.body);
  res.status(StatusCodes.CREATED).json({ stock });
};

const getAllSendStockUser = async (req, res) => {
  const { status, sort, search } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = UserStock.find(queryObject);

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

  const hospitals = await result;

  const totalHospitals = await UserStock.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalHospitals / limit);
  // numOfPages;
  res.status(StatusCodes.OK).json({ hospitals, totalHospitals });
};

const updateSendStockAdmin = async (req, res) => {
  const { id: stockOutId } = req.params;

  const { hospitalName, stock_name, qty, box, status } = req.body;

  if (!hospitalName || !stock_name || !qty || !box) {
    throw new BadRequestError("Please provide all values");
  }

  const stockOutData = await UserStock.findOne({ _id: stockOutId });

  if (!stockOutData) {
    throw new NotFoundError(`No stock data with id :${stockOutId}`);
  }
  // console.log(req.user);
  // console.log();
  checkPermissions(req.user, stockOutData.createdBy);
  // console.log(stockOutData);
  const updatedStockSend = await UserStock.findOneAndUpdate(
    { _id: stockOutId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedStockSend });
};

const deleteSendStockAdmin = async (req, res) => {
  const { id: stockOutId } = req.params;

  const stockout = await UserStock.findOne({ _id: stockOutId });

  if (!stockout) {
    throw new NotFoundError(`No job with id :${stockOutId}`);
  }
  console.log(req.user);
  checkPermissions(req.user, stockout.createdBy);

  await stockout.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! stock out data removed" });
};

const updateSendStockUser = async (req, res) => {
  const { id: stockOutId } = req.params;

  const stockout = await UserStock.findOne({ _id: stockOutId });

  if (!stockout) {
    throw new NotFoundError(`No job with id :${stockOutId}`);
  }

  checkPermissions(req.hospital, stockout.createdFor);

  await stockout.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! stock out data removed" });
};

export {
  sendStockUser,
  getAllSendStockUser,
  deleteSendStockAdmin,
  updateSendStockAdmin,
  updateSendStockUser,
};
