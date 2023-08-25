import express from "express";
import {
  createVacancy,
  deleteVacancy,
  getVacancyBySearch,
} from "../controllers/VacancyController.js";

const router = express.Router();

router.post("/createVacancy", createVacancy);
router.post("/deleteVacancy/:id", deleteVacancy);
router.get("/search", getVacancyBySearch);

export default router;
