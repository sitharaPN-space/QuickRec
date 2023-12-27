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
  deleteAppEduDetail,
  deleteAppExpDetail,
  deleteAppOtherDetail,
  submitAppication,
} from "../controllers/applicationController.js";
import upload from "../../storage.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addBasicDetails", auth, addBasicDetails);
router.post("/addEduDetails", auth, upload.single("attachment"), addEducation);
router.post("/addExpDetails", auth, upload.single("attachment"), addExperience);
router.post(
  "/addOtherDetails",
  auth,
  upload.single("attachment"),
  addOtherDetails
);
router.post(
  "/submitApplication",
  auth,
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "nic", maxCount: 1 },
    { name: "birthCertificate", maxCount: 1 },
  ]),
  submitAppication
);
router.delete("/deleteEduDetail", auth, deleteAppEduDetail);
router.delete("/deleteExpDetail", auth, deleteAppExpDetail);
router.delete("/deleteOtherDetail", auth, deleteAppOtherDetail);
router.post("/approve", auth, approveQualification);
router.post("/reviewed", auth, reviewApplication);
router.get("/userApplication", getAppDetails);
router.get("/basicDetails", getAppBasicDetails);
router.get("/education", getAppEducation);
router.get("/experience", getAppExperience);
router.get("/otherDetails", getAppOtherDetails);
router.get("/allApplications", getApplications);

export default router;
