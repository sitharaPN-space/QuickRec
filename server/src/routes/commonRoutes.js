import express from "express";
import { MasterData } from "../controllers/masterController.js";

const router = express.Router();

router.get("/masterData", MasterData);

export default router;
