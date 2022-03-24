import StocksHosital from "../models/User/stocksHospital.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissionsHospital from "../utils/user/checkPermissionsHospital.js";

const hospitalStockViewAdmin = async (req, res) => {
  const { search } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search) {
    queryObject.stock_name = { $regex: search, $options: "i" };
  }

  let result = StocksHosital.find(queryObject);
  const presentStockUser = await result;
  // console.log(stockInDataTrueStatus);
  // const totalStock = await StocksHosital.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ presentStockUser });
};

export { hospitalStockViewAdmin };
