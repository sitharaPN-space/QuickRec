import express from "express";
import {
  addBasicDetails,
  getApplications,
  getAppDetails,
  approveQualification,
  reviewApplication,
  getAppBasicDetails,
  getAppEducation,
  getAppExperience,
  getAppOtherDetails,
  addEducation,
  addExperience,
  addOtherDetails,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/addBasicDetails", addBasicDetails);
router.post("/addEduDetails", addEducation);
router.post("/addExpDetails", addExperience);
router.post("/addOtherDetails", addOtherDetails);
router.post("/approve", approveQualification);
router.post("/reviewed", reviewApplication);
router.get("/userApplication", getAppDetails);
router.get("/basicDetails", getAppBasicDetails);
router.get("/education", getAppEducation);
router.get("/experience", getAppExperience);
router.get("/otherDetails", getAppOtherDetails);
router.get("/allApplications", getApplications);

export default router;
