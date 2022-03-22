import UserStock from "../../models/User/stockOut.js";
import StocksHosital from "../../models/User/stocksHospital.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import checkPermissionsHospital from "../../utils/user/checkPermissionsHospital.js";

const addStockQty = async (
  hospitalName,
  stock_name,
  totalQtyInOneBox,
  totalBox,
  price
) => {
  await StocksHosital.updateOne(
    { $and: [{ stock_name }, { hospitalName }] },
    {
      $inc: {
        // price: -price,
        totalQtyInOneBox: -totalQtyInOneBox,
        totalBox: -totalBox,
      },
    }
  );
};
const removeStockQty = async (
  hospitalName,
  stock_name,
  totalQtyInOneBox,
  totalBox
) => {
  await stocks.updateOne(
    { $and: [{ stock_name }, { hospitalName }] },
    {
      $inc: {
        totalQtyInOneBox: -totalQtyInOneBox,
        totalBox: -totalBox,
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

  checkPermissionsHospital(req.hospital, stockOutData.createdFor);

  // if (stockOutData.status === true) {
  //   res
  //     .status(StatusCodes.OK)
  //     .json({ msg: "Now, you can't change delivery status" });
  //   return;
  // }
  await UserStock.findOneAndUpdate(
    { _id: stockOutId },
    { status: status },
    {
      new: true,
      runValidators: true,
    }
  );
  addStockQty(
    stockOutData.hospitalName,
    stockOutData.stock_name,
    stockOutData.totalQtyInOneBox,
    stockOutData.totalBox,
    stockOutData.price
  );

  res.status(StatusCodes.OK).json({ msg: "Success! status updated!" });
};

const statusFalse = async (req, res) => {
  const queryObject = {
    createdFor: req.hospital.hospitalName,
    status: false,
  };
  let result = UserStock.find(queryObject);
  const hospitalStock = await result;
  const totalStock = await UserStock.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ hospitalStock, totalStock });
};
const statusTrue = async (req, res) => {
  const queryObject = {
    createdFor: req.hospital.hospitalName,
    status: True,
  };
  let result = UserStock.find(queryObject);
  const hospitalStock = await result;
  const totalStock = await UserStock.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ hospitalStock, totalStock });
};

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

export {
  statusController,
  addStockQty,
  removeStockQty,
  statusFalse,
  statusTrue,
};
