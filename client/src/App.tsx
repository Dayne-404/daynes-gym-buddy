import { UserProvider } from "./features/auth/provider/UserProvider";
import { AuthProvider } from "./features/user/provider/AuthProvider";
import { Login } from "./components/Login";

export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </UserProvider>
  );
}
