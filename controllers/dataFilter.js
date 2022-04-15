import UserStock from "../models/User/stockOut.js";
import { StatusCodes } from "http-status-codes";

const filterDataCalculation = async (req, res) => {
  // var { getQtyByStockName, searchDate, getStockByHospitalName } = req.body;
  var { sDate, eDate, getStockByHospitalName, getQtyByStockName } = req.query;

  var result;

  var new_dates = [];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  new_dates = [];

  function aaa(d) {
    var str = d.split(" ");
    var mon = ("0" + (months.indexOf(str[1]) + 1)).slice(-2);
    new_dates.push(str[3] + "-" + mon + "-" + str[2]);
  }
  if (sDate) {
    aaa(sDate);
    aaa(eDate);
  }

  console.log(new_dates, "new_dates");
  result = await UserStock.aggregate([
    {
      $project: {
        hospitalName: 1,
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
          hospitalName: "$hospitalName",
          name: "$stockOutDetail.stock_name",
        },
        summ: {
          $sum: {
            $multiply: [
              { $toInt: "$stockOutDetail.totalBox" },
              { $toInt: "$stockOutDetail.totalQtyInOneBox" },
            ],
          },
        },
      },
    },
    {
      $group: {
        _id: "$_id.hospitalName",
        stockInfo: {
          $push: {
            itemName: "$_id.name",
            totalQty: "$summ",
          },
        },
      },
    },
  ]);

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
                { $toInt: "$stockOutDetail.totalBox" },
                { $toInt: "$stockOutDetail.totalQtyInOneBox" },
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
                { $toInt: "$stockOutDetail.totalBox" },
                { $toInt: "$stockOutDetail.totalQtyInOneBox" },
              ],
            },
          },
        },
      },
    ]);
  }
  if (!result) {
    result = "no Data";
  }
  // }
  res.status(StatusCodes.OK).json({ result });
};

export { filterDataCalculation };
