import StocksHosital from "../models/User/stocksHospital.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissionsHospital from "../utils/user/checkPermissionsHospital.js";
import UserStock from "../models/User/stockOut.js";

const minimumThresold = async (req, res) => {
  var result = await StocksHosital.aggregate([
    { $match: { $expr: { $lt: ["$totalQtyUser", "$minimumLimit"] } } },
    {
      $group: {
        _id: "$hospitalName",
        belowLimit: {
          $push: {
            stock_name: "$stock_name",
            totalQtyUser: "$totalQtyUser",
            minimumLimit: "$minimumLimit",
          },
        },
      },
    },
  ]);

  const minimumThresoldData = result;
  console.log("call in backend minimumThresoldData", minimumThresoldData);
  res.status(StatusCodes.OK).json({ minimumThresoldData });
};
const hospitalStockViewAdmin = async (req, res) => {
  const { search, id } = req.query;
  // console.log("backend......", id);
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (id) {
    queryObject.createdFor = id;
  }

  let result = StocksHosital.find(queryObject);
  const hospitalPresentStock = await result;
  // console.log(hospitalPresentStock);
  // const totalStock = await StocksHosital.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ hospitalPresentStock });
};

export { hospitalStockViewAdmin, minimumThresold };
