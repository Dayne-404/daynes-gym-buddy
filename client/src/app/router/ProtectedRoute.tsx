import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { type ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, authInitializing } = useAuth();

  if (authInitializing) {
    return <div>Loading session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="login" replace />;
  }

  return children;
};
