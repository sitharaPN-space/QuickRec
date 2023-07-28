import express from "express";
import {
  signup,
  signin,
  applicationSubmit,
} from "../controllers/userController.js";

// import auth from "../middleware/auth.js";

const router = express.Router();

//router.get("/signin", signin);
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/applicationSubmit", applicationSubmit);
// router.post("/menus", getMenu);

export default router;
