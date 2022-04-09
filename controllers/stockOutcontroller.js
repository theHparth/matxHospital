import UserStock from "../models/User/stockOut.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import { addStockQty, removeStockQty } from "./stockController.js";
import Hospital from "../models/Hospital.js";
import mongoose from "mongoose";
import StocksHosital from "../models/User/stocksHospital.js";
import { searchDateSort } from "./dataFilter.js";

const sendStockUser = async (req, res) => {
  const { hospitalName, stockOutDetail } = req.body;
  console.log("stockOutDetail in backend", stockOutDetail);
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
};

const filterResult = async (queryObject, searchText, status) => {
  console.log(typeof searchText);
  if (status) {
    queryObject.status = status;
  }

  var result;
  if (!searchText) {
    result = await UserStock.find(queryObject);
  } else if (searchText == "true" || searchText == "false") {
    searchText === "true" ? true : searchText === "false" ? false : searchText;
    result = await UserStock.find({
      $and: [
        queryObject,
        {
          $or: [{ status: searchText }],
        },
      ],
    });
  } else if (isNaN(searchText) === false) {
    searchText = parseInt(searchText);
    result = await UserStock.find({
      $and: [
        queryObject,
        {
          $or: [{ invoiceNum: searchText }],
        },
      ],
    });
  } else if ((searchText.length == 12, searchText.length == 24)) {
    result = await UserStock.find({
      $and: [
        queryObject,
        {
          $or: [{ createdFor: mongoose.Types.ObjectId(searchText) }],
        },
      ],
    });
  } else {
    result = await UserStock.find({
      $and: [
        queryObject,
        {
          $or: [
            { hospitalName: { $regex: searchText, $options: "i" } },
            {
              stockOutDetail: {
                $elemMatch: {
                  stock_name: { $regex: searchText, $options: "i" },
                },
              },
            },
          ],
        },
      ],
    });
  }
  return result;
};

const getAllSendStockUser = async (req, res) => {
  var {
    status,
    searchText,
    getQtyByStockName,
    getStockByHospitalName,
    hospitalId,
  } = req.query;
  const { searchDate } = req.body;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (hospitalId) {
    queryObject.createdFor = hospitalId;
  }
  let result;

  result = await filterResult(queryObject, searchText, status);

  console.log("------r-------", result);
  if (getStockByHospitalName) {
    result = await UserStock.aggregate([
      {
        $match: {
          $and: [
            { hospitalName: { $regex: getStockByHospitalName, $options: "i" } },
            // { createdBy: req.user.userId },
          ],
        },
      },
      { $unwind: "$stockOutDetail" },
      {
        $group: {
          _id: "$stockOutDetail.stock_name",
          "total Qty": {
            $sum: {
              $multiply: [
                "$stockOutDetail.totalQtyInOneBox",
                "$stockOutDetail.totalBox",
              ],
            },
          },
        },
      },
    ]);
  }

  if (getQtyByStockName) {
    result = await UserStock.aggregate([
      { $unwind: "$stockOutDetail" },
      {
        $group: {
          _id: "$stockOutDetail.stock_name",
          "total Qty": {
            $sum: {
              $multiply: [
                "$stockOutDetail.totalQtyInOneBox",
                "$stockOutDetail.totalBox",
              ],
            },
          },
        },
      },
    ]);
  }
  // result = result.reverse();

  // result = result.sort("-createdAt");

  // var results = await UserStock.aggregate([
  //   { $match: { $expr: { $lt: ["$totalQtyUser", "$minimumLimit"] } } },
  //   {
  //     $group: {
  //       _id: "$hospitalName",
  //       belowLimit: {
  //         $push: {
  //           stock_name: "$stock_name",
  //           totalQtyUser: "$totalQtyUser",
  //         },
  //       },
  //     },
  //   },
  // ]);

  const allStockOutData = result;

  const totalHospitals = await UserStock.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ allStockOutData, totalHospitals });
};

const falseStatusProduct = async (req, res) => {
  var result = await StocksHosital.aggregate([
    { $match: { $expr: { $lt: ["$totalQtyUser", "$minimumLimit"] } } },
    {
      $group: {
        _id: "$hospitalName",
        belowLimit: {
          $push: {
            stock_name: "$stock_name",
            totalQtyUser: "$totalQtyUser",
          },
        },
      },
    },
  ]);

  res.status(StatusCodes.OK).json({ result });
};

const trueStatusProduct = async (req, res) => {
  var { searchDate } = req.body;
  var result;
  if (Array.isArray(searchDate)) {
    console.log("searchDate in backend", searchDate);
    var date = [searchDate[0], searchDate[1]];
    //  [ '2022-04-05T23:29:56.162Z', '2022-04-14T23:29:56.162Z' ]

    var new_dates = [];

    date.forEach((d) => {
      var yyyy = d.substring(0, 4);
      var mm = d.substring(5, 7);
      var dd = d.substring(8, 10);
      new_dates.push(yyyy + "-" + mm + "-" + dd);
    });
    console.log(new_dates, "new_dates");
    result = await UserStock.aggregate([
      {
        $project: {
          createdFor: 1,
          stockOutDetail: 1,
          createdAt: {
            $substr: ["$createdAt", 0, 10],
          },
        },
      },
      {
        $match: {
          $and: [
            {
              createdAt: {
                $gte: new_dates[0],
              },
            },
            {
              createdAt: {
                $lte: new_dates[1],
              },
            },
          ],
        },
      },
      {
        $unwind: "$stockOutDetail",
      },
      {
        $group: {
          _id: {
            for: "$createdFor",
            name: "$stockOutDetail.stock_name",
          },
          summ: {
            $sum: {
              $multiply: [
                "$stockOutDetail.totalBox",
                "$stockOutDetail.totalQtyInOneBox",
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.for",
          stockInfo: {
            $push: {
              itemName: "$_id.name",
              totalQty: "$summ",
            },
          },
        },
      },
    ]);
  }
  res.status(StatusCodes.OK).json({ result });
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

  if (!stockOutData) {
    throw new NotFoundError(`No stock data with id :${stockOutId}`);
  }

  checkPermissions(req.user, stockOutData.createdBy);

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

export {
  sendStockUser,
  getAllSendStockUser,
  deleteSendStockAdmin,
  updateSendStockAdmin,
  falseStatusProduct,
  trueStatusProduct,
};
