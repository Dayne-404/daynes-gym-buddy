import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth";

export const ProtectedRoute = () => {
  const { isAuthenticated, authInitializing } = useAuth();

  if (authInitializing) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="login" replace />;
  }

  return <Outlet />;
};
