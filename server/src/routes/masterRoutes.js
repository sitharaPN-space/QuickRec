import express from "express";
import { BoardGrades, SalaryGroups } from "../controllers/masterController.js";

const router = express.Router();

router.get("/salaryGroups", SalaryGroups);
router.get("/boardGrades", BoardGrades);

export default router;
