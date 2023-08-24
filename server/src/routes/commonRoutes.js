import express from "express";
import {
  createVacancy,
  getVacancyBySearch,
  getAllVacancies,
} from "../controllers/VacancyController.js";
import { downloadFile } from "../controllers/CommonController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllVacancies);
router.post("/createVacancy", createVacancy);
router.get("/search", getVacancyBySearch);
router.post("pdfDownload", downloadFile);

export default router;
