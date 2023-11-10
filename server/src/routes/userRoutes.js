import express from "express";
import {
  signup,
  signin,
  changePassword,
  getUserByEmpNo,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/findEmployee", getUserByEmpNo);
router.post("/changePassword", changePassword);

export default router;
