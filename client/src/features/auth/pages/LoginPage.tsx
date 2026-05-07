import { useState } from "react";
import PageContainer from "@/app/layouts/PageContainer";
import Section from "@/app/layouts/Section";
import Stack from "@/app/layouts/Stack";
import Card from "@/app/layouts/Card";
import Input from "@/components/Input";
import { Lock, Show, Hide, Message } from "react-iconly";
import Button from "../../../components/Button";
import Line from "@/components/Line";
import Redirect from "../components/Redirect";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState<string>("dayne@example.com");
  const [password, setPassword] = useState<string>("password");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loggedIn = await auth.login(email, password);

      if (!loggedIn) {
        throw new Error("Error logging in");
      }

      console.log("Successfully logged in");

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer variant="centered">
      <Card>
        <Stack gap={8}>
          {/* Header */}
          <Section className="text-center">
            <p>Hey, there</p>
            <h4 className="text-h4 font-bold">Welcome Back</h4>
          </Section>

          {/* Form */}
          <Stack gap={4}>
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
            />
            <a className="text-gray-700 underline text-center" href="#">
              Forgot your password?
            </a>
          </Stack>

          {/* Submit Button */}
          <Stack gap={4}>
            <Button text="Login" onClick={handleLogin} disabled={auth.loading}/>
            <Line middleText="Or" />
            <Redirect
              text="Don't have an account yet?"
              linkText="Register"
              to="/register"
            />
          </Stack>
        </Stack>
      </Card>
    </PageContainer>
  );
};
