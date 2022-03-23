import express from "express";
const router = express.Router();

import {
  addStock,
  deleteStock,
  getAllStock,
  updateStock,
} from "../controllers/stockController.js";

router.route("/").post(addStock).get(getAllStock);
router.route("/:id").delete(deleteStock).patch(updateStock);

export default router;
