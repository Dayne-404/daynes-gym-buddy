import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./routeGroups/publicRoutes";
import { protectedRoutes } from "./routeGroups/protectedRoutes";

export const router = createBrowserRouter([
    publicRoutes,
    protectedRoutes
])