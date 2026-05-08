import { Panel, Stack, Box, PageContainer } from "@/app/layout";
import { useState, type FC } from "react";
import { Lock, Message, User, Show, Hide, type IconProps } from "react-iconly";
import { Button, Line, Input, Checkbox } from "@/components";
import AuthRedirect from "../components/AuthRedirect";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { type RegisterForm } from "../types/form.types";
import { validateRegister } from "../services/validateFields";
import { ApiError } from "@/services/ApiError";
import { useForm } from "@/hooks/useForm";

const formFields: {
  name: keyof RegisterForm;
  placeholder: string;
  type: string;
  icon: FC<IconProps>;
}[] = [
  { name: "firstName", placeholder: "First Name", type: "text", icon: User },
  { name: "lastName", placeholder: "Last Name", type: "text", icon: User },
  { name: "email", placeholder: "Email", type: "email", icon: Message },
];

const RegisterPage = () => {
  const { values, errors, handleChange, submit, setFieldError } = useForm(
    { firstName: "", lastName: "", email: "", password: "" },
    validateRegister,
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleOnRegister = async () => {
    if (!submit()) return;

    try {
      await auth.register(values);
      navigate("/register/profile", { replace: true });
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        setFieldError("email", error.message);
      }
    }
  };

  return (
    <PageContainer variant="centered">
      <Panel>
        <Stack gap={8}>
          <Box className="text-center">
            <p>Hey, there</p>
            <h4 className="text-h4 font-bold">Create an account</h4>
          </Box>

          <Stack gap={1}>
            {formFields.map((field) => (
              <Input
                key={field.name}
                {...field}
                value={values[field.name]}
                onChange={handleChange}
                disabled={auth.loading}
                errorText={errors[field.name]}
              />
            ))}

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

            <Checkbox
              checked={checked}
              setChecked={setChecked}
              label="By continuing you accept our Privacy Policy and Terms of Use"
              disabled={auth.loading}
            />
          </Stack>

          <Stack gap={4}>
            <Button
              text="Register"
              onClick={handleOnRegister}
              disabled={auth.loading}
            />
            <Line middleText="Or" />
            <AuthRedirect
              text="Already have an account?"
              linkText="Login"
              to="/login"
              disabled={auth.loading}
            />
          </Stack>
        </Stack>
      </Panel>
    </PageContainer>
  );
};

export default RegisterPage;
