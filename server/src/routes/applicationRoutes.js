import express from "express";
import {
  addBasicDetails,
  getBasicDetails,
} from "../controllers/applicationController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addBasicDetails", addBasicDetails);
router.get("/basicDetails", getBasicDetails);

export default router;
