import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./routeGroups/publicRoutes";
import { protectedRoutes } from "./routeGroups/protectedRoutes";
import { onBoardingRoutes } from "./routeGroups/onBoardingRoutes";

export const router = createBrowserRouter([
    publicRoutes,
    protectedRoutes,
    onBoardingRoutes
])