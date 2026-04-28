import { Router } from "express";
import * as userControllers from "../controllers/user.controller";
import { requireAuth } from "../middleware/authHandler";

const router = Router();

router.get("/", requireAuth, userControllers.getUser);
router.put("/", requireAuth, userControllers.updateUser);
router.put("/password", requireAuth, userControllers.updatePassword);

export default router;