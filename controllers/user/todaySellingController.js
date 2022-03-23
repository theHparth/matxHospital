import TodaySellingHospital from "../../models/User/todaySellingUser.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import checkPermissionsHospital from "../../utils/user/checkPermissionsHospital.js";
import { addStockQty, removeStockQty } from "./userStockController.js";
import UserStock from "../../models/User/stockOut.js";

const AddtodaySellingHospital = async (req, res) => {
  // here you can remove vendor_id
  const { stock_name, totalQtyInOneBox, totalBox } = req.body;

  if (!totalQtyInOneBox || !totalBox || !stock_name) {
    throw new BadRequestError("Please provide all values");
  }
  var hospitalName = req.hospital.hospitalName;
  console.log(hospitalName);

  req.body.createdFor = req.hospital.hospitalName;
  //remove below line after connecting frontend
  // req.body.createdFor = "User";
  var yourHospital = await UserStock.find({ yourHospital, stock_name });
  req.body.createdBy = yourHospital[0].createdBy;

  const todaySelling = await TodaySellingHospital.create(req.body);

  removeStockQty(hospitalName, stock_name, totalQtyInOneBox, totalBox);

  res.status(StatusCodes.CREATED).json({ todaySelling });
};

const allTodaySelling = async (req, res) => {
  const queryObject = {
    createdFor: req.hospital.hospitalName,
  };

  let result = TodaySellingHospital.find(queryObject);

  const stockListTodaySelling = await result;

  res.status(StatusCodes.OK).json({ stockListTodaySelling });
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
  // console.log(todaySellingData);
  if (!todaySellingData) {
    throw new NotFoundError(`No stock data with id :${stockOutId}`);
  }

  // checkPermissionsHospital(req.hospital, todaySellingData.createdFor);
  const updatedStock = await TodaySellingHospital.findOneAndUpdate(
    { _id: stockOutId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  var hospitalName = req.hospital.hospitalName;
  // console.log(
  //   todaySellingData.stock_name,
  //   todaySellingData.totalQtyInOneBox,
  //   todaySellingData.totalBox
  // );
  // console.log(hospitalName, stock_name, totalQtyInOneBox, totalBox);
  addStockQty(
    hospitalName,
    todaySellingData.stock_name,
    todaySellingData.totalQtyInOneBox,
    todaySellingData.totalBox
  );
  removeStockQty(hospitalName, stock_name, totalQtyInOneBox, totalBox);

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
  //change after connecting frontend ==> remove comment
  checkPermissionsHospital(req.hospital, todaySellingData.createdFor);
  var hospitalName = req.hospital.hospitalName;
  await todaySellingData.remove();
  addStockQty(
    hospitalName,
    todaySellingData.stock_name,
    todaySellingData.totalQtyInOneBox,
    todaySellingData.totalBox
  );

  res.status(StatusCodes.OK).json({ msg: "Success! stock out data removed" });
};

export {
  AddtodaySellingHospital,
  updateTodaySelling,
  deleteTodaySelling,
  allTodaySelling,
};
