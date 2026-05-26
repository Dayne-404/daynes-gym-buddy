import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../routeGuards/ProtectedRoute";

const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const CaloriesPage = lazy(() => import("@/features/calories/pages/CaloriesPage"));
const WeightsPage = lazy(() => import("@/features/weight/pages/WeightsPage"));
const RoutinesPage = lazy(() => import("@/features/routines/pages/RoutinesPage"));
const RoutinePage = lazy(() => import("@/features/routines/pages/RoutinePage"));
const CreateRoutinePage = lazy(() => import("@/features/routines/pages/CreateRoutinePage"));
const ExercisesPage = lazy(() => import("@/features/exercises/pages/ExercisesPage"));
const ExercisePage = lazy(() => import("@/features/exercises/pages/ExercisePage"));
const CreateExercisePage = lazy(() => import("@/features/exercises/pages/CreateExercisePage"));

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
    { path: "/routines/create", element: <CreateRoutinePage /> },
  ],
};
