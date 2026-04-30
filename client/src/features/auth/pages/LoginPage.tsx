import { useState } from "react";
import { useAuth } from '@/features/auth';
import { useUser } from "@/features/user";

export const LoginPage = () => {
  const [email, setEmail] = useState("dayne@example.com");
  const [password, setPassword] = useState("password");
  const auth = useAuth();
  const user = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2>Login</h2>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Error message */}
      {auth.loginError && <p style={{ color: "red" }}>{auth.loginError}</p>}

      {/* Submit */}
      <button type="submit" disabled={auth.loading}>
        {auth.loading ? "Logging in..." : "Login"}
      </button>
      <div style={{ padding: '0.5rem' }}>
        <h1>User</h1>
        <p>{user.user?.userId}</p>
        <p>{user.user?.email}</p>
        <p>{user.user?.firstName}</p>
        <p>{user.user?.lastName}</p>
        <p>{user.user?.avatarColor}</p>
      </div>
    </form>
  );
};
