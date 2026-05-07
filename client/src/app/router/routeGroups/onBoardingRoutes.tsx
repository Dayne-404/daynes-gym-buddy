import { type RouteObject } from "react-router-dom";
import { OnBoardingRoute } from "../routeGuards/OnBoardingRoute";
import RegisterProfilePage from "@/features/auth/pages/OnBoardingProfilePage";

export const onBoardingRoutes: RouteObject = {
  element: <OnBoardingRoute />,
  children: [{ path: "/register/profile", element: <RegisterProfilePage /> }],
};
