import express from "express";
import {
  signup,
  signin,
  changePassword,
  changeUserRole,
  getEmployees,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getEmployee", getEmployees);
router.post("/changePassword", auth, changePassword);
router.post("/changeUserRole", auth, changeUserRole);

export default router;
