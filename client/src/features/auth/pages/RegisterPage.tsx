import { useState, type FC } from "react";
import FormInput from "../components/FormInput";
import PageContainer from "@/components/PageContainer";
import { Lock, Message, User, Show, Hide, type IconProps } from "react-iconly";
import { Checkbox } from "../components/Checkbox";
import SubmitButton from "../components/SubmitButton";
import Line from "@/components/Line";
import LoginRedirect from "../components/LoginRedirect";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <PageContainer>
      <div className="text-center pb-8">
        <p>Hey, there</p>
        <h4 className="text-h4 font-bold">Create an account</h4>
      </div>
      
      <div className="w-full max-w-md mx-auto space-y-4 pb-50">
        {formFields.map((field) => (
          <FormInput
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            value={form[field.name]}
            onChange={handleChange}
            icon={field.icon}
          />
        ))}
        <FormInput
          name="password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          icon={Lock}
          endIcon={showPassword ? Show : Hide}
          onEndIconClick={() => setShowPassword((v) => !v)}
        />
        <Checkbox
          checked={checked}
          setChecked={setChecked}
          label="By continuing you accept our Privacy Policy and Terms of Use"
        />
      </div>
      <div className="w-full max-w-md mx-auto">
        <SubmitButton />
        <Line middleText="Or"/>
        <LoginRedirect />
      </div>
    </PageContainer>
  );
};

export default RegisterPage;
