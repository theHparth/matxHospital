import express from "express";
const router = express.Router();

import {
  sendStockUser,
  getAllSendStockUser,
  deleteSendStockAdmin,
  updateSendStockAdmin,
  falseStatusProduct,
  trueStatusProduct,
} from "../controllers/stockOutcontroller.js";

router.route("/").post(sendStockUser).get(getAllSendStockUser);
router.route("/sortData").post(getAllSendStockUser);
router.route("/:id").delete(deleteSendStockAdmin).patch(updateSendStockAdmin);
// router.route("/user/:id").patch(updateSendStockUser); // to update status after receiving new stock
router.route("/falseAdmin").get(falseStatusProduct);
router.route("/trueAdmin").get(trueStatusProduct);
export default router;
