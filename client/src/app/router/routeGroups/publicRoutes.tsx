import { type RouteObject } from "react-router-dom";
import { PublicOnlyRoute } from "../routeGuards/PublicRoute";
import { LoginPage, RegisterPage } from "@/features/auth";

export const publicRoutes: RouteObject = {
  element: <PublicOnlyRoute />,

  children: [
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  ],
};
