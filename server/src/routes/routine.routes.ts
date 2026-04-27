import { Router } from "express";
import routineControllers from "../controllers/routine.controller";
import { requireAuth } from "../middleware/authHandler";

const router = Router();

router.get("/", requireAuth, routineControllers.getAll);
router.get("/:id", requireAuth, routineControllers.getById);

router.post("/", requireAuth, routineControllers.create);
router.put("/:id", requireAuth, routineControllers.update);
router.delete("/:id", requireAuth, routineControllers.remove);

export default router;