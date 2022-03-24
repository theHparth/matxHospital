import express from "express";
const router = express.Router();

import { hospitalStockViewAdmin } from "../controllers/hospitalStockViewAdmin.js";

router.route("/").get(hospitalStockViewAdmin);

export default router;
