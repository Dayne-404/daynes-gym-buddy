import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { OnBoardingRoute } from "../routeGuards/OnBoardingRoute";

const RegisterProfilePage = lazy(() => import("@/features/auth/pages/OnBoardingProfilePage"));

export const onBoardingRoutes: RouteObject = {
  element: <OnBoardingRoute />,
  children: [{ path: "/register/profile", element: <RegisterProfilePage /> }],
};
