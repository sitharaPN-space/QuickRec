import express from "express";
import {
  addBasicDetails,
  getApplications,
  getAppDetails,
  approveQualification,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/addBasicDetails", addBasicDetails);
router.post("/approve", approveQualification);
router.get("/userApplication", getAppDetails);
router.get("/allApplications", getApplications);

export default router;
