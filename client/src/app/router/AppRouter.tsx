import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "@/features/auth";
import { ProtectedRoute } from "./ProtectedRoute";

const DashboardPage = () => <h1>Dashboard</h1>;
const NotFoundPage = () => <h1>404 Not Found</h1>

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes */}
            <Route path="/" element={
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
            }/>

            {/* Catch all */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;