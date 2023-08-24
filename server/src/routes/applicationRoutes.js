import express from "express";
import {
  addBasicDetails,
  getBasicDetails,
  getEduDetails,
  deleteEduDetails,
} from "../controllers/applicationController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addBasicDetails", addBasicDetails);
router.get("/basicDetails", getBasicDetails);
router.get("/eduDetails", getEduDetails);
router.delete("/deleteEduDetails", deleteEduDetails);

export default router;
