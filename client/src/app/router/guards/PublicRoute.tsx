import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth";

export const PublicOnlyRoute = () => {
  const { isAuthenticated, authInitializing } = useAuth();

  if (authInitializing) return <div>Loading...</div>;

  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};