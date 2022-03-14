import express from "express";
const router = express.Router();

import {
  addHospital,
  deleteHospital,
  getAllHospital,
  updateHospital,
} from "../controllers/hospitalsController.js";

router.route("/").post(addHospital).get(getAllHospital);
// remember about :id
// router.route("/stats").get(showStats);
router.route("/:id").delete(deleteHospital).patch(updateHospital);

export default router;
