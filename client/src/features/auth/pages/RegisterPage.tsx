import { Panel, Stack, Box, PageContainer } from "@/app/layout";
import { useState, type FC } from "react";
import { Lock, Message, User, Show, Hide, type IconProps } from "react-iconly";
import { Button, Line, Input, Checkbox } from "@/components";
import AuthRedirect from "../components/AuthRedirect";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { type RegisterForm } from "../types/form.types";
import { validateRegister } from "../services/validateFields";

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
  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<{
    [key in keyof RegisterForm]: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnRegister = async () => {
    console.log(form);
    const errors = validateRegister(form);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      await auth.register(form);
      navigate("/register/profile", { replace: true });
    } catch (error: unknown) {
      //TODO Fix this nonsense
      if (error instanceof Error) {
        if (
          error.message ===
          '{"success":false,"message":"Email is already in use"}'
        ) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email is already in use",
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
          <Box className="text-center">
            <p>Hey, there</p>
            <h4 className="text-h4 font-bold">Create an account</h4>
          </Box>

          <Stack gap={1}>
            {formFields.map((field) => (
              <Input
                key={field.name}
                {...field}
                value={form[field.name]}
                onChange={handleChange}
                disabled={auth.loading}
                errorText={formErrors[field.name]}
              />
            ))}

            <Input
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              icon={Lock}
              endIcon={showPassword ? Show : Hide}
              onEndIconClick={() => setShowPassword((v) => !v)}
              disabled={auth.loading}
              errorText={formErrors.password}
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
