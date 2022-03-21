import TodaySellingHospital from "../../models/User/todaySellingUser.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import checkPermissionsHospital from "../../utils/user/checkPermissionsHospital.js";
import { addStockQty, removeStockQty } from "./userStockController.js";

const AddtodaySellingHospital = async (req, res) => {
  // here you can remove vendor_id
  const { stock_name, totalQtyInOneBox, totalBox } = req.body;

  if (!totalQtyInOneBox || !totalBox || !stock_name) {
    throw new BadRequestError("Please provide all values");
  }
  var hospitalname = req.hospital.hospitalName;

  req.body.createdFor = req.hospital.hospitalName;

  const todaySelling = await TodaySellingHospital.create(req.body);

  removeStockQty(hospitalname, stock_name, totalQtyInOneBox, totalBox);

  res.status(StatusCodes.CREATED).json({ todaySelling });
};

const allTodaySelling = async (req, res) => {
  const queryObject = {
    createdFor: req.hospital.hospitalName,
  };

  let result = TodaySellingHospital.find(queryObject);

  const stockList = await result;

  res.status(StatusCodes.OK).json({ stockList });
};

const updateTodaySelling = async (req, res) => {
  const { id: stockOutId } = req.params;

  const { stock_name, totalQtyInOneBox, totalBox } = req.body;

  if (!totalQtyInOneBox || !totalBox || !stock_name) {
    throw new BadRequestError("Please provide all values");
  }

  const todaySellingData = await TodaySellingHospital.findOne({
    _id: stockOutId,
  });

  if (!todaySellingData) {
    throw new NotFoundError(`No stock data with id :${stockOutId}`);
  }

  checkPermissionsHospital(req.hospital, todaySellingData.createdFor);
  //   req.body.createdFor = hospitalName;
  const updatedStock = await TodaySellingHospital.findOneAndUpdate(
    { _id: stockOutId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  removeStockQty(
    todaySellingData.stock_name,
    todaySellingData.totalQtyInOneBox,
    todaySellingData.totalBox,
    todaySellingData.price
  );
  addStockQty(stock_name, price, totalQtyInOneBox, totalBox);

  res.status(StatusCodes.OK).json({ updatedStock });
};

const deleteTodaySelling = async (req, res) => {
  const { id: stockOutId } = req.params;

  const todaySellingData = await TodaySellingHospital.findOne({
    _id: stockOutId,
  });

  if (!todaySellingData) {
    throw new NotFoundError(`No job with id :${stockOutId}`);
  }

  checkPermissionsHospital(req.hospital, todaySellingData.createdFor);

  await TodaySellingHospital.remove();
  removeStockQty(
    todaySellingData.stock_name,
    todaySellingData.totalQtyInOneBox,
    todaySellingData.totalBox,
    todaySellingData.price
  );

  res.status(StatusCodes.OK).json({ msg: "Success! stock out data removed" });
};

export {
  AddtodaySellingHospital,
  updateTodaySelling,
  deleteTodaySelling,
  allTodaySelling,
};
