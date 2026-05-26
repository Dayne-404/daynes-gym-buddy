import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { PublicOnlyRoute } from "../routeGuards/PublicRoute";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));

export const publicRoutes: RouteObject = {
  element: <PublicOnlyRoute />,

  children: [
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  ],
};
