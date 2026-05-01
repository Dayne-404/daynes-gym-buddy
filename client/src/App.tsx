import { UserProvider } from "./features/user";
import { AuthProvider } from "./features/auth";
import AppRouter from "./app/router/AppRouter";


export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </UserProvider>
  );
}
