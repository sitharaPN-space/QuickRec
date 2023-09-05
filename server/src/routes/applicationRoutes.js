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
  getApplicationsByVacancy,
  getUserApplication,
  approveQualification,
  evaluateAppliaction,
} from "../controllers/applicationController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addBasicDetails", addBasicDetails);
router.get("/basicDetails", getBasicDetails);
router.get("/eduDetails", getEduDetails);
router.get("/expDetails", getExpDetails);
router.get("/achvDetails", getAchvDetails);
router.get("/allApplications", getApplicationsByVacancy);
router.delete("/deleteEduDetails", deleteEduDetails);
router.delete("/deleteExpDetails", deleteExpDetails);
router.delete("/deleteAchvDetails", deleteAchvDetails);
router.get("/userApplication", getUserApplication);
router.post("/approve", approveQualification);
router.post("/reviewed", evaluateAppliaction);

export default router;
