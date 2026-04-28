import { Router } from "express";

import authRoutes from "./auth.routes";
import exerciseRoutes from "./exercise.routes";
import routineRoutes from "./routine.routes";
import routineExerciseRoutes from "./routineExercise.routes";
import calorieRoutes from "./calorie.routes";
import weightRoutes from "./weight.routes";
import { requireAuth } from "../middleware/authHandler";
import userRoutes from "./user.routes";

const router = Router();

// Auth + user
router.use("/auth", authRoutes);
router.use("/users", requireAuth, userRoutes);

// Core features
router.use("/exercises", requireAuth, exerciseRoutes);
router.use("/routines", requireAuth, routineRoutes);

// Nested resource (important)
router.use("/routine-exercises", requireAuth, routineExerciseRoutes);

// Tracking
router.use("/calories", requireAuth, calorieRoutes);
router.use("/weights", requireAuth, weightRoutes);

export default router;
