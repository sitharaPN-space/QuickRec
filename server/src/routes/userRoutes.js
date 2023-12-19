import express from "express";
import {
  signup,
  signin,
  getEmployees,
  changeUserRole,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getEmployee", getEmployees);
router.post("/changeUserRole", changeUserRole);
router.post("/changePassword", changePassword);

export default router;
