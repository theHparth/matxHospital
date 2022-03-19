import express from "express";
const router = express.Router();

import {
  addStockUser,
  deleteStockUser,
  getAllStockUser,
  updateStockUser,
  updateStockAdmin,
} from "../../controllers/user/userStockController.js";

router.route("/").post(addStockUser).get(getAllStockUser);
router.route("/:id").delete(deleteStockUser).patch(updateStockAdmin);
router.route("/user/:id").patch(updateStockUser);

export default router;
