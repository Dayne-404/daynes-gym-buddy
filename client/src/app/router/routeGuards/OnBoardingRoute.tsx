import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { useUser } from "@/features/user";

export const OnBoardingRoute = () => {
  const { isAuthenticated, authInitializing } = useAuth();
  const { profileComplete } = useUser();

  if (authInitializing) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (profileComplete) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
