import { type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../routeGuards/ProtectedRoute";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import { CaloriesPage } from "@/features/calories";
import WeightsPage from "@/features/weight/pages/WeightsPage";
import { RoutinePage, RoutinesPage } from "@/features/routines";
import {
  ExercisesPage,
  ExercisePage,
  CreateExercisePage,
} from "@/features/exercises";

export const protectedRoutes: RouteObject = {
  element: <ProtectedRoute />,
  children: [
    { path: "/", element: <DashboardPage /> },
    { path: "/calories", element: <CaloriesPage /> },
    { path: "/weights", element: <WeightsPage /> },
    { path: "/routines", element: <RoutinesPage /> },
    { path: "/exercises", element: <ExercisesPage /> },
    { path: "/exercises/create", element: <CreateExercisePage /> },
    { path: "/exercises/:id", element: <ExercisePage /> },
    { path: "/routines/:id", element: <RoutinePage /> },
  ],
};
