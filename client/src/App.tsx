import { UserProvider } from "@/features/user";
import { AuthProvider } from "@/features/auth";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";

export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </UserProvider>
  );
}
