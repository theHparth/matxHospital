import UserStock from "../../models/User/stockOut.js";
import StocksHosital from "../../models/User/stocksHospital.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import checkPermissionsHospital from "../../utils/user/checkPermissionsHospital.js";

const addStockQty = async (
  createdFor,
  stock_name,
  totalQtyInOneBox,
  totalBox
) => {
  // console.log(createdFor);
  // console.log(totalQtyInOneBox * totalBox);
  var obId = createdFor.toString();
  // var aaa = await StocksHosital.find({
  //   $and: [{ stock_name }, { createdFor: obId }],
  // });
  // var aaa = await StocksHosital.find({ createdFor: obId });
  // console.log("stocks2", aaa);
  await StocksHosital.updateOne(
    { $and: [{ stock_name }, { createdFor: obId }] },
    {
      $inc: {
        totalQtyUser: totalQtyInOneBox * totalBox,
      },
    }
  );
};
const removeStockQty = async (
  createdFor,
  stock_name,
  totalQtyInOneBox,
  totalBox
) => {
  var obId = createdFor.toString();
  var aaa = await StocksHosital.find({
    $and: [{ stock_name }, { createdFor: obId }],
  });
  console.log("stocks2", aaa);
  console.log(totalQtyInOneBox * totalBox);
  await StocksHosital.updateOne(
    { $and: [{ stock_name }, { createdFor: obId }] },
    {
      $inc: {
        totalQtyUser: -(totalQtyInOneBox * totalBox),
      },
    }
  );
};

const statusController = async (req, res) => {
  const { id: stockOutId } = req.params;

  const { status } = req.body;
  const stockOutData = await UserStock.findOne({ _id: stockOutId });

  if (!stockOutData) {
    throw new NotFoundError(`No stock data with id :${stockOutId}`);
  }
  // console.log(req.hospital.hospitalId, stockOutData.createdFor);
  checkPermissionsHospital(req.hospital, stockOutData.createdFor);
  var createdFor = stockOutData.createdFor;

  var createdBy = stockOutData.createdBy;
  var stockname = stockOutData.stock_name;

  let result = await StocksHosital.findOne({
    stock_name: stockname,
  });

  if (!result) {
    var stock_name = stockOutData.stock_name;
    var hospitalName = req.hospital.hospitalName;
    await StocksHosital.create({
      hospitalName,
      stock_name,
      createdFor,
      createdBy: createdBy,
    });
  }
  if (stockOutData.status === true) {
    res
      .status(StatusCodes.OK)
      .json({ msg: "Now, you can't change delivery status" });
    return;
  }

  await UserStock.findOneAndUpdate(
    { _id: stockOutId },
    { status: status },
    {
      new: true,
      runValidators: true,
    }
  );
  addStockQty(
    createdFor,
    stockOutData.stock_name,
    stockOutData.totalQtyInOneBox,
    stockOutData.totalBox
  );

  res.status(StatusCodes.OK).json({ msg: "Success! status updated!" });
};

const statusFalse = async (req, res) => {
  const queryObject = {
    createdFor: req.hospital.hospitalId,
    status: false,
  };
  let result = UserStock.find(queryObject);
  const stockInDataFalseStatus = await result;
  const totalStock = await UserStock.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ stockInDataFalseStatus, totalStock });
};
const statusTrue = async (req, res) => {
  const queryObject = {
    createdFor: req.hospital.hospitalId,
    status: true,
  };
  let result = UserStock.find(queryObject);
  const stockInDataTrueStatus = await result;
  const totalStock = await UserStock.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ stockInDataTrueStatus, totalStock });
};

const totoalStocksInUser = async (req, res) => {
  const queryObject = {
    createdFor: req.hospital.hospitalId,
  };
  // console.log(req.hospital.hospitalName);
  let result = StocksHosital.find(queryObject);
  const presentStockUser = await result;
  // console.log(stockInDataTrueStatus);
  // const totalStock = await StocksHosital.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ presentStockUser });
};

const minimumRequiremantUserChange = async (req, res) => {
  const { id: stockId } = req.params;

  const { minimumLimit } = req.body;
  const stockOutData = await StocksHosital.findOne({ _id: stockId });

  if (!stockOutData) {
    throw new NotFoundError(`No stock data with id :${stockId}`);
  }

  checkPermissionsHospital(req.hospital, stockOutData.createdFor);
  var hospitalName = stockOutData.hospitalName;
  var stock_name = stockOutData.stock_name;
  var createdFor = stockOutData.createdFor;
  var totalQtyUser = stockOutData.totalQtyUser;
  var createdBy = stockOutData.createdBy;
  await StocksHosital.findOneAndUpdate(
    { _id: stockId },
    {
      minimumLimit,
      hospitalName,
      stock_name,
      createdFor,
      totalQtyUser,
      createdBy,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: "Success! status updated!" });
};
// const sendStockUser = async (req, res) => {
//   var { hospitalName, stock_name, qty, box, status } = req.body;
//   // here you can remove vendor_id
//   console.log(hospitalName, stock_name, qty, box, status);

//   if (!hospitalName || !stock_name || !qty || !box) {
//     throw new BadRequestError("Please provide all values");
//   }

//   req.body.createdBy = req.user.userId;
//   req.body.createdFor = hospitalName;

//   const stock = await UserStock.create(req.body);
//   res.status(StatusCodes.CREATED).json({ stock });
// };

export {
  statusController,
  addStockQty,
  removeStockQty,
  statusFalse,
  statusTrue,
  totoalStocksInUser,
  minimumRequiremantUserChange,
};
