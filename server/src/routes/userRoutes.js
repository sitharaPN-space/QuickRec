import express from "express";
import {
  signup,
  signin,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/changePassword", changePassword);

export default router;
