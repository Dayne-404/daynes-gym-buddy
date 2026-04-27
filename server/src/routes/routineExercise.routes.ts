import { Router } from "express";
import routineExerciseControllers from "../controllers/routineExercise.controller";
import { requireAuth } from "../middleware/authHandler";

const router = Router();

router.get("/", requireAuth, routineExerciseControllers.getAll);
router.get("/:id", requireAuth, routineExerciseControllers.getById);

router.post("/", requireAuth, routineExerciseControllers.create);
router.put("/:id", requireAuth, routineExerciseControllers.update);
router.delete("/:id", requireAuth, routineExerciseControllers.remove);

export default router;