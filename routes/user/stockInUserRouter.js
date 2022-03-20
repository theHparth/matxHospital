import express from "express";
const router = express.Router();

import {
  statucController,
  //   sendStockUser,
  //   getAllSendStockUser,
  //   deleteSendStockAdmin,
  //   updateSendStockAdmin,
  //   updateSendStockUser,
} from "../../controllers/user/userStockController.js";

router.route("/status/:id").patch(statucController);
// router.route("/:id").delete(deleteSendStockAdmin).patch(updateSendStockAdmin);
// router.route("/user/:id").patch(updateSendStockUser); // to update status after receiving new stock

export default router;
