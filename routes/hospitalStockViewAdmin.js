import express from "express";
const router = express.Router();

import {
  hospitalStockViewAdmin,
  minimumThresold,
} from "../controllers/hospitalStockViewAdmin.js";

router.route("/").get(hospitalStockViewAdmin);
router.route("/minimumThresold").get(minimumThresold);

export default router;
