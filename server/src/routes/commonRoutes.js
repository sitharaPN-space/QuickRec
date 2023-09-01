import express from "express";
import { MasterData, downloadFile } from "../controllers/commonController.js";

const router = express.Router();

router.get("/masterData", MasterData);
router.post("/pdfDownload", downloadFile);

export default router;
