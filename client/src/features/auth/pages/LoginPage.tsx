import { useState } from "react";
import { useAuth } from "@/features/auth";
import { useUser } from "@/features/user";
import { apiRequest } from "@/services/apiClient";

const emptyUser: User = {
  userId: "",
  firstName: "",
  lastName: "",
  avatarColor: "",
  email: "",
};

export const LoginPage = () => {
  const [email, setEmail] = useState("dayne@example.com");
  const [password, setPassword] = useState("password");
  const [reqUser, setReqUser] = useState<User>(emptyUser);
  const auth = useAuth();
  const user = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.login(email, password);
  };

  const getUserData = async () => {
    const req = await apiRequest<User>({
      endpoint: "/users/me",
    });

    if (req) {
      setReqUser(req as User);
    }
  };

  return (
    <div>
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
        <div style={{ padding: "0.5rem" }}>
          <h1>User</h1>
          <p>{user.user?.userId}</p>
          <p>{user.user?.email}</p>
          <p>{user.user?.firstName}</p>
          <p>{user.user?.lastName}</p>
          <p>{user.user?.avatarColor}</p>
        </div>
      </form>
      <div>
        <button style={{ display: "block" }} onClick={getUserData}>
          Get user
        </button>
        <button
          style={{ display: "block" }}
          onClick={() => {
            setReqUser(emptyUser);
          }}
        >
          Empty user
        </button>
      </div>
      <div style={{ padding: "0.5rem" }}>
        <h1>User</h1>
        <p>{reqUser.userId}</p>
        <p>{reqUser.email}</p>
        <p>{reqUser.firstName}</p>
        <p>{reqUser.lastName}</p>
        <p>{reqUser.avatarColor}</p>
      </div>
    </div>
  );
};
