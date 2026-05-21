import { type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../routeGuards/ProtectedRoute";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import { CaloriesPage } from "@/features/calories";
import WeightsPage from "@/features/weight/pages/WeightsPage";
import { RoutinesPage } from "@/features/routines";

export const protectedRoutes: RouteObject = {
  element: <ProtectedRoute />,
  children: [
    { path: "/", element: <DashboardPage /> },
    { path: "/calories", element: <CaloriesPage /> },
    { path: "/weights", element: <WeightsPage /> },
    { path: "/routines", element: <RoutinesPage /> },
  ],
};
