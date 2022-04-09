import UserStock from "../models/User/stockOut.js";

const searchDateHospitalSort = async () => {
  var { getQtyByStockName, searchDate, getStockByHospitalName } = req.body;
  // console.log("in filter page", searchDate);
  var result;
  // if (Array.isArray(searchDate)) {
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

  // }
  res.status(StatusCodes.OK).json({ result });
};

export { searchDateHospitalSort };
