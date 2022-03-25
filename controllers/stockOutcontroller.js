import UserStock from "../models/User/stockOut.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import { addStockQty, removeStockQty } from "./stockController.js";
import Hospital from "../models/Hospital.js";

const sendStockUser = async (req, res) => {
  // here you can remove vendor_id
  const { hospitalName, stock_name, totalQtyInOneBox, totalBox, price } =
    req.body;

  if (
    !hospitalName ||
    !totalQtyInOneBox ||
    !totalBox ||
    !stock_name ||
    !price
  ) {
    throw new BadRequestError("Please provide all values");
  }

  const hospitalData = await Hospital.findOne({ hospitalName });
  console.log(hospitalData._id);

  req.body.createdBy = req.user.userId;
  req.body.createdFor = hospitalData._id;

  const stock = await UserStock.create(req.body);

  removeStockQty(stock_name, totalQtyInOneBox, totalBox, price);

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

  const hospitals = await result;

  const totalHospitals = await UserStock.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ hospitals, totalHospitals });
};

const falseStatusProduct = async (req, res) => {
  const { status, sort, search } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
    status: false,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = UserStock.find(queryObject);

  const stockOutDataFalseStatus = await result;

  const totalHospitals = await UserStock.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ stockOutDataFalseStatus, totalHospitals });
};

const trueStatusProduct = async (req, res) => {
  const { status, sort, search } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
    status: true,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = UserStock.find(queryObject);

  const stockOutDataTrueStatus = await result;

  const totalStockOutData = await UserStock.countDocuments(queryObject);

  res
    .status(StatusCodes.OK)
    .json({ stockOutDataTrueStatus, totalStockOutData });
};

const updateSendStockAdmin = async (req, res) => {
  const { id: stockOutId } = req.params;

  const { hospitalName, stock_name, totalQtyInOneBox, totalBox, price } =
    req.body;

  if (
    !hospitalName ||
    !totalQtyInOneBox ||
    !totalBox ||
    !stock_name ||
    !price
  ) {
    throw new BadRequestError("Please provide all values");
  }

  const stockOutData = await UserStock.findOne({ _id: stockOutId });

  if (!stockOutData) {
    throw new NotFoundError(`No stock data with id :${stockOutId}`);
  }
  if (stockOutData.status === true) {
    res.status(StatusCodes.OK).json({ msg: "Now you can not change data" });
    return;
  }

  checkPermissions(req.user, stockOutData.createdBy);
  const hospitalData = await Hospital.findOne({ hospitalName });

  addStockQty(
    stockOutData.stock_name,
    stockOutData.totalQtyInOneBox,
    stockOutData.totalBox,
    stockOutData.price
  );
  req.body.createdFor = hospitalData._id;
  const updatedStockSend = await UserStock.findOneAndUpdate(
    { _id: stockOutId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  removeStockQty(stock_name, totalQtyInOneBox, totalBox, price);

  res.status(StatusCodes.OK).json({ updatedStockSend });
};

const deleteSendStockAdmin = async (req, res) => {
  const { id: stockOutId } = req.params;

  const stockout = await UserStock.findOne({ _id: stockOutId });
  console.log(stockout);
  if (stockout.status === true) {
    res.status(StatusCodes.OK).json({ msg: "Now you can not delete data" });
    return;
  }

  if (!stockout) {
    throw new NotFoundError(`No job with id :${stockOutId}`);
  }

  checkPermissions(req.user, stockout.createdBy);

  addStockQty(
    stockout.stock_name,
    stockout.totalQtyInOneBox,
    stockout.totalBox,
    stockout.price
  );
  await stockout.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! stock out data removed" });
};

const updateSendStockUser = async (req, res) => {
  // const { id: stockOutId } = req.params;
  // const stockout = await UserStock.findOne({ _id: stockOutId });
  // if (!stockout) {
  //   throw new NotFoundError(`No job with id :${stockOutId}`);
  // }
  // checkPermissions(req.hospital, stockout.createdFor);
  // await stockout.remove();
  // res.status(StatusCodes.OK).json({ msg: "Success! stock out data removed" });
};

export {
  sendStockUser,
  getAllSendStockUser,
  deleteSendStockAdmin,
  updateSendStockAdmin,
  updateSendStockUser,
  falseStatusProduct,
  trueStatusProduct,
};
