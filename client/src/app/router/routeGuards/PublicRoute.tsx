import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth";

export const PublicOnlyRoute = () => {
  const { isAuthenticated, authInitializing } = useAuth();

  if (authInitializing) return null;

  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};