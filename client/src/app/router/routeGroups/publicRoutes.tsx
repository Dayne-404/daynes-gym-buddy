import { type RouteObject } from "react-router-dom";
import { PublicOnlyRoute } from "../guards/PublicRoute";
import { LoginPage } from "@/features/auth";
import RegisterPage from "@/features/auth/pages/RegisterPage";

export const publicRoutes: RouteObject = {
  element: <PublicOnlyRoute />,

  children: [
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  ],
};
