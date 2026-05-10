import { type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../routeGuards/ProtectedRoute";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import { CaloriesPage } from "@/features/calories";

export const protectedRoutes: RouteObject = {
  element: <ProtectedRoute />,
  children: [
    { path: "/", element: <DashboardPage /> },
    { path: "/calories", element: <CaloriesPage /> },
  ],
};
