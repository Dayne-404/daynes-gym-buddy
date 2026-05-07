import { type RouteObject } from "react-router-dom";
import { OnBoardingRoute } from "../guards/OnBoardingRoute";
import RegisterProfilePage from "@/features/auth/pages/RegisterProfilePage";

export const onBoardingRoutes: RouteObject = {
  element: <OnBoardingRoute />,
  children: [{ path: "/register/profile", element: <RegisterProfilePage /> }],
};
