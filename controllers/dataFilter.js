import UserStock from "../models/User/stockOut.js";

const searchDateSort = async (searchDate) => {
  // console.log("in filter page", searchDate);
  var date = [searchDate[0], searchDate[1]];
  //  [ '2022-04-05T23:29:56.162Z', '2022-04-14T23:29:56.162Z' ]

  var new_dates = [];

  date.forEach((d) => {
    var yyyy = d.substring(0, 4);
    var mm = d.substring(5, 7);
    var dd = d.substring(8, 10);
    new_dates.push(yyyy + "-" + mm + "-" + dd);
  });

  // console.log(new_dates, "new data");
  UserStock.aggregate([
    {
      $project: {
        createdFor: 1,
        itemName: 1,
        totalQty: 1,
        createAt: {
          $substr: ["$createAt", 0, 10],
        },
      },
    },
    {
      $match: {
        $and: [
          {
            createAt: {
              $gte: new_dates[0],
            },
          },
          {
            createAt: {
              $lte: new_dates[1],
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: {
          for: "$createdFor",
          name: "$itemName",
        },
        sum: {
          $sum: "$totalQty",
        },
      },
    },
    {
      $group: {
        _id: "$_id.for",
        stockInfo: {
          $push: {
            itemName: "$_id.name",
            totalQty: "$sum",
          },
        },
      },
    },
  ]);
};

export { searchDateSort };
