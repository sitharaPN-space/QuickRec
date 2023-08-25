import express from "express";
import {
  addBasicDetails,
  getBasicDetails,
  getEduDetails,
  deleteEduDetails,
  deleteExpDetails,
  deleteAchvDetails,
  getExpDetails,
  getAchvDetails,
} from "../controllers/applicationController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addBasicDetails", addBasicDetails);
router.get("/basicDetails", getBasicDetails);
router.get("/eduDetails", getEduDetails);
router.get("/expDetails", getExpDetails);
router.get("/achvDetails", getAchvDetails);
router.delete("/deleteEduDetails", deleteEduDetails);
router.delete("/deleteExpDetails", deleteExpDetails);
router.delete("/deleteAchvDetails", deleteAchvDetails);

export default router;
