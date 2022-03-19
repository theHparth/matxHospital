import UserStock from "../../models/User/stockOut.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import checkPermissions from "../../utils/checkPermissions.js";
import { removeStockQty } from "../../controllers/stockController.js";

const addStockUser = async (req, res) => {
  const {
    price,
    qty,
    box,
    stock_name,
    stockTotoalPrice,
    hospitalName,
    statusAdmin,
    statusUser,
  } = req.body;

  if (!qty || !box || !stock_name || !statusAdmin || !hospitalName) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;
  //   req.body.createdFor = hospitalName;

  removeStockQty(stock_name, box, qty, price, stockTotoalPrice);
  // var a = await WereHouseStocks.aggregate({
  //   $group: {
  //     stock_name: stock_name,
  //     totalQty: { $sum: "$qty" },
  //     totalPrice: { $sum: "$price" },
  //     totalBox: { $sum: "$box" },
  //   },
  // });
  // var aa = WereHouseStocks.aggregate([
  //   { $group: { stock_name: "$stock_name", TotalQty: { $sum: "$qty" } } },
  // ]);
  // console.log({ aa });
  const stock = await UserStock.create(req.body);

  res.status(StatusCodes.CREATED).json({ stock });
};

const getAllStockUser = async (req, res) => {
  const { status, sort, search, hospitalName } = req.query;

  var queryObject;
  if (req.user.hospitalName) {
    queryObject = { createdBy: req.user.userId, statusAdmin: true };
  } else {
    queryObject = { createdFor: req.user.userId };
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = UserStock.find(queryObject);

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

  const stockListUser = await result;
  // console.log(vendorData);
  // const totalVendors = await vendors.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalVendors / limit);
  // console.log(totalVendors);
  res.status(StatusCodes.OK).json({ stockListUser });
};

const updateStockUser = async (req, res) => {
  const { createdFor: hospitalName } = req.params;
  const { id, statusAdmin, stockIdUser, qty, box } = req.body;
  if (statusAdmin === true) {
    throw new BadRequestError(
      "After Updating status you can not change status"
    );
  }
  if (statusAdmin === false) {
    if (!qty) {
      throw new BadRequestError("Please provide all values");
    }
  }
  if (!id || !statusAdmin) {
    throw new BadRequestError("Please provide all values");
  }

  const stock = await UserStock.findOne({ _id: stockIdUser });
  if (!stock) {
    throw new NotFoundError(`No job with id :${stockIdUser}`);
  }
  checkPermissions(req.user.hospitalName, stock.createdFor);

  const updatedStock = await UserStock.findOneAndUpdate(
    { _id: stockIdUser },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
};

const updateStockAdmin = async (req, res) => {
  const { id: stockIdUser } = req.params;

  const {
    price,
    qty,
    box,
    stock_name,
    stockTotoalPrice,
    statusAdmin,
    statusUser,
  } = req.body;

  if (
    !price ||
    !qty ||
    !box ||
    !stock_name ||
    !stockTotoalPrice ||
    !statusAdmin
  ) {
    throw new BadRequestError("Please provide all values");
  }

  const stock = await UserStock.findOne({ _id: stockIdUser });

  if (!stock) {
    throw new NotFoundError(`No job with id :${stockIdUser}`);
  }
  // check permissions

  checkPermissions(req.user, stock.createdBy);

  const updatedStock = await UserStock.findOneAndUpdate(
    { _id: stockIdUser },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedStock });
};

const deleteStockUser = async (req, res) => {
  const { id: stockId } = req.params;

  const stock = await WereHouseStocks.findOne({ _id: stockId });

  if (!stock) {
    throw new NotFoundError(`No job with id :${stockId}`);
  }

  checkPermissions(req.user, stock.createdBy);

  await stock.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Stock removed" });
};

export {
  addStockUser,
  deleteStockUser,
  getAllStockUser,
  updateStockAdmin,
  updateStockUser,
};
