import { Router } from "express";
import calorieControllers from "../controllers/calorie.controller";
import { requireAuth } from "../middleware/authHandler";

const router = Router();

router.get("/", requireAuth, calorieControllers.getAll);
router.get("/:id", requireAuth, calorieControllers.getById);

router.post("/", requireAuth, calorieControllers.create);
router.put("/:id", requireAuth, calorieControllers.update);
router.delete("/:id", requireAuth, calorieControllers.remove);

export default router;