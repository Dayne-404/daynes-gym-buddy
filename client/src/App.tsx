import { UserProvider } from "./features/user";
import { LoginPage, AuthProvider } from "./features/auth";


export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </UserProvider>
  );
}
