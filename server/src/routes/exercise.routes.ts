import { Router } from "express";
import exerciseControllers from "../controllers/exercise.controller";
import { requireAuth } from "../middleware/authHandler";

const router = Router();

router.get("/", requireAuth, exerciseControllers.getAll);
router.get("/:id", requireAuth, exerciseControllers.getById);

router.post("/", requireAuth, exerciseControllers.create);
router.put("/:id", requireAuth, exerciseControllers.update);
router.delete("/:id", requireAuth, exerciseControllers.remove);

export default router;