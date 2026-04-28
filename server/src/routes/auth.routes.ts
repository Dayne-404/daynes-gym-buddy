import { Router } from "express";
import * as authControllers from '../controllers/auth.controller'
import { requireAuth } from "../middleware/authHandler";

const router = Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);
router.post('/refresh', authControllers.refresh);

export default router;