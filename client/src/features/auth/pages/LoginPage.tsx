import { useState } from "react";
import { Panel, Stack, Box, PageContainer } from "@/app/layout";
import { Input, Button, Line } from "@/components";
import { Lock, Show, Hide, Message } from "react-iconly";
import AuthRedirect from "../components/AuthRedirect";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../services/validateFields";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("dayne@example.com");
  const [password, setPassword] = useState<string>("password");
  const [formErrors, setFormErrors] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const errors = validateLogin(email, password);
    setFormErrors((prev) => ({ ...prev, ...errors }));

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      await auth.login(email, password);
      navigate("/", { replace: true });
    } catch (error: unknown) {
      //TODO Fix this nonsense
      if (error instanceof Error) {
        if (
          error.message ===
          '{"success":false,"message":"Incorrect email or password"}'
        ) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            email: "Incorrect Email or Password",
            password: " ",
          }));
        }
      } else {
        console.error("An unknown error occurred during registration");
      }
    }
  };

  return (
    <PageContainer variant="centered">
      <Panel>
        <Stack gap={8}>
          {/* Header */}
          <Box className="text-center">
            <p>Hey, there</p>
            <h4 className="text-h4 font-bold">Welcome Back</h4>
          </Box>

          {/* Form */}
          <Stack gap={1}>
            <Input
              key={"login-email"}
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              icon={Message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              disabled={auth.loading}
              errorText={formErrors.email}
            />
            <Input
              key={"login-password"}
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              icon={Lock}
              endIcon={showPassword ? Show : Hide}
              onEndIconClick={() => setShowPassword((v) => !v)}
              disabled={auth.loading}
              errorText={formErrors.password}
            />
            <a className="text-gray-700 underline text-center" href="#">
              Forgot your password?
            </a>
          </Stack>

          {/* Submit Button */}
          <Stack gap={4}>
            <Button
              text="Login"
              onClick={handleLogin}
              disabled={auth.loading}
            />
            <Line middleText="Or" />
            <AuthRedirect
              text="Don't have an account yet?"
              linkText="Register"
              to="/register"
            />
          </Stack>
        </Stack>
      </Panel>
    </PageContainer>
  );
};

export default LoginPage;
