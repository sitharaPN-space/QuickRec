import express from "express";
import { vacancyList } from "../controllers/CommonController";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/vacnacies", vacancyList);

export default router;
