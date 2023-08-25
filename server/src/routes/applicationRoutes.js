import express from "express";
import {
  addBasicDetails,
  getApplications,
  getBasicDetails,
} from "../controllers/applicationController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addBasicDetails", addBasicDetails);
router.get("/basicDetails", getBasicDetails);
router.get("/allApplications", getApplications);

export default router;
