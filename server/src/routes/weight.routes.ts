import { Router } from "express";
import weightControllers from "../controllers/weight.controller";
import { requireAuth } from "../middleware/authHandler";

const router = Router();

router.get("/", requireAuth, weightControllers.getAll);
router.get("/:id", requireAuth, weightControllers.getById);

router.post("/", requireAuth, weightControllers.create);
router.put("/:id", requireAuth, weightControllers.update);
router.delete("/:id", requireAuth, weightControllers.remove);

export default router;