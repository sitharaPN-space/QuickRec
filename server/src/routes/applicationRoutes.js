import express from "express";
import { addBasicDetails } from "../controllers/applicationController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addBasicDetails", addBasicDetails);

export default router;
