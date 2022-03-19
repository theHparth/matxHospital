import stocks from "../models/Stocks.js";
import { StatusCodes } from "http-status-codes";

import { BadRequestError, NotFoundError } from "../errors/index.js";

import checkPermissions from "../utils/checkPermissions.js";

const addStockQty = async (stock_name, box, qty, price, stockTotoalPrice) => {
  // await stocks.findOneAndUpdate(
  //   { stock_name: stock_name },
  //   { totalIndovisualPrice: price }
  // );
  await stocks.update(
    { stock_name },
    { $inc: { totalBox: box } },
    { $inc: { totalIndovisualPrice: price } }
  );
};
const removeStockQty = async (
  stock_name,
  box,
  qty,
  price,
  stockTotoalPrice
) => {
  await stocks.findOneAndUpdate(
    { stock_name: stock_name },
    { totalIndovisualPrice: price }
  );
};

const addStock = async (req, res) => {
  var { description, stock_name } = req.body;
  // here you can remove vendor_id
  if (!description || !stock_name) {
    throw new BadRequestError("Please provide all values");
  }
  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }
  // stock_names = capitalizeFirstLetter(stock_name);
  var result = {};
  result.stock_name = { $regex: stock_name, $options: "i" };
  const stockAlreadyExists = await stocks.findOne(result);
  // console.log(stockAlreadyExists);
  if (stockAlreadyExists) {
    throw new BadRequestError("Stock already in Database");
  }
  req.body.createdBy = req.user.userId;

  const stock = await stocks.create(req.body);
  res.status(StatusCodes.CREATED).json({ stock });
};

const getAllStock = async (req, res) => {
  const { status, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.stock_name = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = stocks.find(queryObject);
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

  const stockList = await result;
  // console.log(vendorData);
  // const totalVendors = await vendors.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalVendors / limit);
  // console.log(totalVendors);
  res.status(StatusCodes.OK).json({ stockList });
};

const updateStock = async (req, res) => {
  const { id: stockId } = req.params;

  const { description, stock_name } = req.body;

  if (!description || !stock_name) {
    throw new BadRequestError("Please provide all values");
  }

  const stock = await stocks.findOne({ _id: stockId });

  if (!stock) {
    throw new NotFoundError(`No job with id :${stockId}`);
  }
  // check permissions

  checkPermissions(req.user, stock.createdBy);

  const updatedStock = await stocks.findOneAndUpdate(
    { _id: stockId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedStock });
};

const deleteStock = async (req, res) => {
  const { id: stockId } = req.params;

  const stock = await stocks.findOne({ _id: stockId });

  if (!stock) {
    throw new NotFoundError(`No job with id :${stockId}`);
  }

  checkPermissions(req.user, stock.createdBy);

  await stock.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Stock removed" });
};

export {
  addStock,
  deleteStock,
  getAllStock,
  updateStock,
  addStockQty,
  removeStockQty,
};
