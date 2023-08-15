import express from "express";
import {
  createVacancy,
  getVacancyBySearch,
} from "../controllers/VacancyController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createVacancy", createVacancy);
router.get("/search", getVacancyBySearch);

export default router;