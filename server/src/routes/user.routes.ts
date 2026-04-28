import { Router } from "express";
import * as userControllers from "../controllers/user.controller";
import { requireAuth } from "../middleware/authHandler";

const router = Router();

router.get("/me", requireAuth, userControllers.getUser);
router.put("/me", requireAuth, userControllers.updateUser);
router.put("/password", requireAuth, userControllers.updatePassword);

export default router;