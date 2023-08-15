import express from "express";
import {
  createVacancy,
  getVacancyBySearch,
  getAllVacancies,
} from "../controllers/VacancyController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllVacancies);
router.post("/createVacancy", createVacancy);
router.get("/search", getVacancyBySearch);

export default router;
