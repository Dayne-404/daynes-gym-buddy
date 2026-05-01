import { type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../guards/ProtectedRoute";

export const protectedRoutes: RouteObject = {
  element: <ProtectedRoute />,
  children: [{ path: "/", element: <h1>Dashboard Page</h1> }],
};
