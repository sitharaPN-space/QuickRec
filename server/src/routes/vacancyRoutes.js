import express from "express";
import {
  createVacancy,
  deleteVacancy,
  getVacancyBySearch,
} from "../controllers/VacancyController.js";
import upload from "../../storage.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createVacancy", auth, upload.single("attachment"), createVacancy);
router.delete("/deleteVacancy/:id", auth, deleteVacancy);
router.get("/search", getVacancyBySearch);

export default router;
