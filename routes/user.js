import express from "express";
import { getMyProfile, login, logout, register, home } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/", isAuthenticated, home);


router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

export default router;
