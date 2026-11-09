
import express from "express";

import { register, login } from "../controllers/authController.js";
import {
  logout,
  getSessionUser,
} from "../controllers/sessionController.js";

import { verifySession } from "../middleware/sessionMiddleware.js";

const router = express.Router();

// Public authentication routes
router.post("/register", register);
router.post("/login", login);

// Protected session routes
router.post("/logout", verifySession, logout);
router.get("/session", verifySession, getSessionUser);

export default router;
