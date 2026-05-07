import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { useUser } from "@/features/user";

export const ProtectedRoute = () => {
  const { isAuthenticated, authInitializing } = useAuth();
  const { profileComplete } = useUser();

  if (authInitializing) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!profileComplete) {
    return <Navigate to="/register/profile" replace />;
  }

  return <Outlet />;
};
