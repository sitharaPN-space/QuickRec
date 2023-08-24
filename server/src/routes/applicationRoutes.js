import express from "express";
import {
  addBasicDetails,
  getBasicDetails,
  getEduDetails,
  addEduDetails,
} from "../controllers/applicationController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addBasicDetails", addBasicDetails);
router.get("/basicDetails", getBasicDetails);
router.get("/eduDetails", getEduDetails);
// router.post("/addEduDetails", addEduDetails);

export default router;
