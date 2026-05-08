import { useState } from "react";
import { Panel, Stack, Box, PageContainer } from "@/app/layout";
import { Input, Button, Line } from "@/components";
import { Lock, Show, Hide, Message } from "react-iconly";
import AuthRedirect from "../components/AuthRedirect";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../services/validateFields";
import { ApiError } from "@/services/ApiError";
import { useForm } from "@/hooks/useForm";

const LoginPage = () => {
  const { values, errors, handleChange, submit, setFieldError } = useForm(
    { email: "", password: "" },
    validateLogin,
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!submit()) return;

    try {
      await auth.login(values.email, values.password);
      navigate("/", { replace: true });
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        setFieldError("email", error.message);
        setFieldError("password", " ");
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
              name="email"
              placeholder="Email"
              type="email"
              value={values.email}
              icon={Message}
              onChange={handleChange}
              disabled={auth.loading}
              errorText={errors.email}
            />
            <Input
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              icon={Lock}
              endIcon={showPassword ? Show : Hide}
              onEndIconClick={() => setShowPassword((v) => !v)}
              disabled={auth.loading}
              errorText={errors.password}
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
