import { type RouteObject } from "react-router-dom";
import { PublicOnlyRoute } from "../guards/PublicRoute";
import { LoginPage } from "@/features/auth";

export const publicRoutes: RouteObject = {
  element: <PublicOnlyRoute />,
  children: [
    { path: "/login", element: <LoginPage /> },
    { path: "*", element: <h1>Hello World</h1> },
  ],
};
