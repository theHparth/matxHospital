import WereHouseStocks from "../models/Warehouse.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import { addStockQty, removeStockQty } from "../controllers/stockController.js";

const addStockinWereHouse = async (req, res) => {
  // const { vendor_name, stock_name, price, totalQtyInOneBox, totalBox } =
  //   req.body;

  // if (!vendor_name || !price || !totalQtyInOneBox || !totalBox || !stock_name) {
  //   throw new BadRequestError("Please provide all values");
  // }

  // req.body.createdBy = req.user.userId;

  // const stock = await WereHouseStocks.create(req.body);

  // addStockQty(stock_name, totalQtyInOneBox, totalBox, price);

  // res.status(StatusCodes.CREATED).json({ stock });
  const { invoiceNumStockIn, vendor_name, stockInDetail, stockInNote } =
    req.body;
  if (!invoiceNumStockIn || !vendor_name || !stockInDetail) {
    throw new BadRequestError("Please provide all values");
  }
  stockInDetail.map((data) => {
    if (
      !data.totalQtyInOneBox ||
      !data.totalBox ||
      !data.stock_name ||
      !data.price
    ) {
      throw new BadRequestError("Please provide all values");
    }
    addStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });

  req.body.createdBy = req.user.userId;
  const stock = await WereHouseStocks.create(req.body);
  res.status(StatusCodes.CREATED).json({ stock });
};

const getAllStockfromWereHouse = async (req, res) => {
  const { status, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = WereHouseStocks.find(queryObject);

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

const updateStockfromWereHouse = async (req, res) => {
  const { id: stockId } = req.params;

  const { invoiceNumStockIn, vendor_name, stockInDetail, stockInNote } =
    req.body;
  if (!invoiceNumStockIn || !vendor_name || !stockInDetail) {
    throw new BadRequestError("Please provide all values");
  }

  const stock = await WereHouseStocks.findOne({ _id: stockId });

  if (!stock) {
    throw new NotFoundError(`No stock data in werehouse with id :${stockId}`);
  }
  // check permissions

  checkPermissions(req.user, stock.createdBy);

  stockInDetail.map((data) => {
    if (
      !data.totalQtyInOneBox ||
      !data.totalBox ||
      !data.stock_name ||
      !data.price
    ) {
      throw new BadRequestError("Please provide all values");
    }
    addStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });

  stock.stockInDetail.map((data) => {
    removeStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });

  const updatedStock = await WereHouseStocks.findOneAndUpdate(
    { _id: stockId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  // removeStockQty(
  //   stock.stock_name,
  //   stock.totalQtyInOneBox,
  //   stock.totalBox,
  //   stock.price
  // );
  // addStockQty(stock_name, totalQtyInOneBox, totalBox, price);

  res.status(StatusCodes.OK).json({ updatedStock });
};

const deleteStockfromWereHouse = async (req, res) => {
  const { id: stockId } = req.params;
  const stock = await WereHouseStocks.findOne({ _id: stockId });
  // console.log(stock);

  if (!stock) {
    throw new NotFoundError(`No stock data in werehouse with id :${stockId}`);
  }

  checkPermissions(req.user, stock.createdBy);

  stock.stockInDetail.map((data) => {
    removeStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });

  await stock.remove();

  // await WereHouseStocks.remove();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Success! Stock data from werehouse is removed" });
};

export {
  addStockinWereHouse,
  deleteStockfromWereHouse,
  getAllStockfromWereHouse,
  updateStockfromWereHouse,
};
