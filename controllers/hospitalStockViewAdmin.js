import StocksHosital from "../models/User/stocksHospital.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissionsHospital from "../utils/user/checkPermissionsHospital.js";

const hospitalStockViewAdmin = async (req, res) => {
  const { search, id } = req.query;
  // console.log("backend......", id);
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search) {
    queryObject.hospitalName = { $regex: search, $options: "i" };
  }
  if (id) {
    queryObject.hospitalPresentStock = id;
  }

  let result = StocksHosital.find(queryObject);
  const hospitalPresentStock = await result;
  // console.log(hospitalPresentStock);
  // const totalStock = await StocksHosital.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ hospitalPresentStock });
};

export { hospitalStockViewAdmin };
