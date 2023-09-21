import express from "express";
import {
  createVacancy,
  deleteVacancy,
  getVacancyBySearch,
} from "../controllers/VacancyController.js";
import upload from "../../storage.js";

const router = express.Router();

router.post("/createVacancy", upload.single("attachment"), createVacancy);
router.delete("/deleteVacancy/:id", deleteVacancy);
router.get("/search", getVacancyBySearch);

export default router;
