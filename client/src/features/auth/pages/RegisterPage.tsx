import { useState, type FC } from "react";
import Input from "../../../components/Input";
import PageContainer from "@/app/layouts/PageContainer";
import { Lock, Message, User, Show, Hide, type IconProps } from "react-iconly";
import { Checkbox } from "../../../components/Checkbox";
import Button from "../../../components/Button";
import Line from "@/components/Line";
import Card from "@/app/layouts/Card";
import Stack from "@/app/layouts/Stack";
import Section from "@/app/layouts/Section";
import Redirect from "../components/Redirect";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const emptyForm: RegisterForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

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
  const [form, setForm] = useState<RegisterForm>(emptyForm);
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
    //TODO: FormValidation
    try {
      const loggedIn = await auth.register(form);

      if (!loggedIn) {
        throw new Error("Error logging in");
      }

      console.log("Successfully auth");

      navigate("/register/profile", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer variant="centered">
      <Card>
        <Stack gap={8}>
          <Section className="text-center">
            <p>Hey, there</p>
            <h4 className="text-h4 font-bold">Create an account</h4>
          </Section>

          <Stack gap={4}>
            {formFields.map((field) => (
              <Input
                key={field.name}
                {...field}
                value={form[field.name]}
                onChange={handleChange}
                disabled={auth.loading}
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
            <Redirect
              text="Already have an account?"
              linkText="Login"
              to="/login"
              disabled={auth.loading}
            />
          </Stack>
        </Stack>
      </Card>
    </PageContainer>
  );
};

export default RegisterPage;
