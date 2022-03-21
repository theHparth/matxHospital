import express from "express";
const router = express.Router();

import {
  statusController,
  statusFalse,
  statusTrue,
} from "../../controllers/user/userStockController.js";

import {
  AddtodaySellingHospital,
  updateTodaySelling,
  deleteTodaySelling,
  allTodaySelling,
} from "../../controllers/user/todaySellingController.js";

router.route("/status/:id").patch(statusController);
router.route("/falseUser").get(statusFalse);
router.route("/trueUser").get(statusTrue);
router
  .route("/todaySellingHospital")
  .post(AddtodaySellingHospital)
  .get(allTodaySelling);

router.route("/:id").delete(deleteTodaySelling).patch(updateTodaySelling);

// router.route("/:id").delete(deleteSendStockAdmin).patch(updateSendStockAdmin);
// router.route("/user/:id").patch(updateSendStockUser); // to update status after receiving new stock

export default router;
