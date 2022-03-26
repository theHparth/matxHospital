import UserStock from "../models/User/stockOut.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import { addStockQty, removeStockQty } from "./stockController.js";
import Hospital from "../models/Hospital.js";

const sendStockUser = async (req, res) => {
  const { hospitalName, stockOutDetail } = req.body;
  const getRandomId = (min = 0, max = 500000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString().padStart(6, "0");
  };

  var invoiceNum = getRandomId();
  const invoice = await UserStock.findOne({ invoiceNum });
  if (invoice) {
    getRandomId();
  }
  const hospitalData = await Hospital.findOne({ hospitalName });
  if (!hospitalData) {
    throw new BadRequestError("Hospital data not found");
  }

  stockOutDetail.map((data) => {
    if (
      !data.totalQtyInOneBox ||
      !data.totalBox ||
      !data.stock_name ||
      !data.price
    ) {
      throw new BadRequestError("Please provide all values");
    }
    removeStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });
  req.body.invoiceNum = invoiceNum;
  req.body.createdBy = req.user.userId;
  req.body.createdFor = hospitalData._id;

  const stock = await UserStock.create(req.body);
  res.status(StatusCodes.CREATED).json({ stock });

  ///////////////////////////////////////////////////////////////////////////////////////////

  // here you can remove vendor_id
  // const { hospitalName, stock_name, totalQtyInOneBox, totalBox, price } =
  //   req.body;

  // if (
  //   !hospitalName ||
  //   !totalQtyInOneBox ||
  //   !totalBox ||
  //   !stock_name ||
  //   !price
  // ) {
  //   throw new BadRequestError("Please provide all values");
  // }

  // const hospitalData = await Hospital.findOne({ hospitalName });
  // console.log(hospitalData._id);

  // req.body.createdBy = req.user.userId;
  // req.body.createdFor = hospitalData._id;

  // const stock = await UserStock.create(req.body);

  // removeStockQty(stock_name, totalQtyInOneBox, totalBox, price);

  // res.status(StatusCodes.CREATED).json({ stock });
};

const getAllSendStockUser = async (req, res) => {
  const { status, sort, search, invoiceNum } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (invoiceNum) {
    queryObject.invoiceNum = invoiceNum;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = UserStock.find(queryObject);

  const sendedStock = await result;

  const totalHospitals = await UserStock.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ sendedStock, totalHospitals });
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

  const { hospitalName, stockOutDetail } = req.body;

  const hospitalData = await Hospital.findOne({ hospitalName });
  if (!hospitalData) {
    throw new BadRequestError("Hospital data not found");
  }
  req.body.createdFor = hospitalData._id;

  const stockOutData = await UserStock.findOne({ _id: stockOutId });

  checkPermissions(req.user, stockOutData.createdBy);

  if (!stockOutData) {
    throw new NotFoundError(`No stock data with id :${stockOutId}`);
  }
  if (stockOutData.status === true) {
    res.status(StatusCodes.OK).json({ msg: "Now you can not change data" });
    return;
  }

  stockOutDetail.map((data) => {
    if (
      !data.totalQtyInOneBox ||
      !data.totalBox ||
      !data.stock_name ||
      !data.price
    ) {
      throw new BadRequestError("Please provide all values");
    }
    removeStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });

  stockOutData.stockOutDetail.map((data) => {
    addStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });

  const updatedStockSend = await UserStock.findOneAndUpdate(
    { _id: stockOutId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedStockSend });

  // if (
  //   !hospitalName ||
  //   !totalQtyInOneBox ||
  //   !totalBox ||
  //   !stock_name ||
  //   !price
  // ) {
  //   throw new BadRequestError("Please provide all values");
  // }

  // checkPermissions(req.user, stockOutData.createdBy);
  // const hospitalData = await Hospital.findOne({ hospitalName });

  // addStockQty(
  //   stockOutData.stock_name,
  //   stockOutData.totalQtyInOneBox,
  //   stockOutData.totalBox,
  //   stockOutData.price
  // );
  // req.body.createdFor = hospitalData._id;
  // const updatedStockSend = await UserStock.findOneAndUpdate(
  //   { _id: stockOutId },
  //   req.body,
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // );

  // removeStockQty(stock_name, totalQtyInOneBox, totalBox, price);

  // res.status(StatusCodes.OK).json({ updatedStockSend });
};

const deleteSendStockAdmin = async (req, res) => {
  const { id: stockOutId } = req.params;

  const stockout = await UserStock.findOne({ _id: stockOutId });

  if (!stockout) {
    throw new NotFoundError(`No job with id :${stockOutId}`);
  }
  if (stockout.status === true) {
    res.status(StatusCodes.OK).json({ msg: "Now you can not delete data" });
    return;
  }

  checkPermissions(req.user, stockout.createdBy);

  stockout.stockOutDetail.map((data) => {
    addStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });
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
