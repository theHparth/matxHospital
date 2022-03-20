import express from "express";
const router = express.Router();

import {
  sendStockUser,
  getAllSendStockUser,
  deleteSendStockAdmin,
  updateSendStockAdmin,
  updateSendStockUser,
} from "../../controllers/stockOutcontroller.js";

router.route("/").post(sendStockUser).get(getAllSendStockUser);
router.route("/:id").delete(deleteSendStockAdmin).patch(updateSendStockAdmin);
router.route("/user/:id").patch(updateSendStockUser); // to update status after receiving new stock

export default router;
