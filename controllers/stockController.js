import stocks from "../models/Stocks.js";
import { StatusCodes } from "http-status-codes";

import { BadRequestError, NotFoundError } from "../errors/index.js";

import checkPermissions from "../utils/checkPermissions.js";

const addStockQty = async (stock_name, price, totalQtyInOneBox, totalBox) => {
  try {
    await stocks.updateOne(
      { stock_name },
      {
        $inc: {
          totalQty: totalBox * totalQtyInOneBox,
          price,
        },
      }
    );
  } catch (err) {
    console.log(err);
    throw new NotFoundError(
      `Something is wrong while adding value in database`
    );
  }
};
const removeStockQty = async (stock_name, totalQtyInOneBox, totalBox) => {
  try {
    const stock = await stocks.findOne({ stock_name });
    // if(totalBox * totalQtyInOneBox)
    // var pp =
    //   stock.price -
    //   (stock.price / stock.totalQty) * totalBox * totalQtyInOneBox;
    // if (pp < 0) {
    //   throw new NotFoundError("value is already minimum level");
    // }
    // console.log(stock.price / stock.totalQty);
    // console.log(totalBox * totalQtyInOneBox);
    // console.log(totalBox * totalQtyInOneBox);
    await stocks.updateOne(
      { stock_name },
      {
        $inc: {
          totalQty: -(totalBox * totalQtyInOneBox),
          price: -(
            (stock.price / stock.totalQty) *
            totalBox *
            totalQtyInOneBox
          ),
        },
      }
    );
  } catch (err) {
    console.log(err);
    throw new NotFoundError(
      `Something is wrong while removing value in database`
    );
  }
};

const addStock = async (req, res) => {
  var { description, stock_name, minimumLimit } = req.body;
  // here you can remove vendor_id
  if (!description || !stock_name || !minimumLimit) {
    throw new BadRequestError("Please provide all values");
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  stock_name = capitalizeFirstLetter(stock_name);
  var result = {};
  result.stock_name = { $regex: stock_name, $options: "i" };
  const stockAlreadyExists = await stocks.findOne(result);

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

  const { description, stock_name, minimumLimit } = req.body;

  if (!description || !stock_name || !minimumLimit) {
    throw new BadRequestError("Please provide all values");
  }

  const stock = await stocks.findOne({ _id: stockId });

  if (!stock) {
    throw new NotFoundError(`No stock data with id :${stockId}`);
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

  res.status(StatusCodes.OK).json({ msg: "Success! stock data removed" });
};

export {
  addStock,
  deleteStock,
  getAllStock,
  updateStock,
  addStockQty,
  removeStockQty,
};
