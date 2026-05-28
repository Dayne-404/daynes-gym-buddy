import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { useUser } from "@/features/user";
import AuthInitializingPage from "@/app/pages/AuthInitalizatingPage";

export const OnBoardingRoute = () => {
  const { isAuthenticated, authInitializing } = useAuth();
  const { profileComplete } = useUser();

  if (authInitializing) return <AuthInitializingPage />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (profileComplete) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
