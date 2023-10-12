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

router.use(auth);
router.post("/addBasicDetails", addBasicDetails);
router.post("/addEduDetails", upload.single("attachment"), addEducation);
router.post("/addExpDetails", upload.single("attachment"), addExperience);
router.post("/addOtherDetails", upload.single("attachment"), addOtherDetails);
router.post(
  "/submitApplication",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "nic", maxCount: 1 },
    { name: "birthCertificate", maxCount: 1 },
  ]),
  submitAppication
);
router.delete("/deleteEduDetail", deleteAppEduDetail);
router.delete("/deleteExpDetail", deleteAppExpDetail);
router.delete("/deleteOtherDetail", deleteAppOtherDetail);
router.post("/approve", approveQualification);
router.post("/reviewed", reviewApplication);
router.get("/userApplication", getAppDetails);
router.get("/basicDetails", getAppBasicDetails);
router.get("/education", getAppEducation);
router.get("/experience", getAppExperience);
router.get("/otherDetails", getAppOtherDetails);
router.get("/allApplications", getApplications);

export default router;
