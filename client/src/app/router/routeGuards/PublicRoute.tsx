import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth";
import AuthInitializingPage from "@/app/pages/AuthInitalizatingPage";

export const PublicOnlyRoute = () => {
  const { isAuthenticated, authInitializing } = useAuth();

  if (authInitializing) return <AuthInitializingPage />;

  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};