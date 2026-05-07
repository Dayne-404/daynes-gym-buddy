import { Panel, Stack, Box, PageContainer } from "@/app/layout";
import { Button, Input } from "@/components";
import {
  TwoUsers,
  Calendar,
  PaperPlus,
  Swap,
  ArrowDownSquare,
  type IconProps,
} from "react-iconly";
import { useState, type FC } from "react";
import heroImage from "@/assets/woman_lifting.svg";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/features/user";
import type { ProfileForm } from "../types/form.types";
import { validateProfile } from "../services/validateFields";

const formFields: {
  name: keyof ProfileForm;
  placeholder: string;
  type: string;
  icon: FC<IconProps>;
  endIcon?: FC<IconProps>;
}[] = [
  {
    name: "gender",
    placeholder: "Choose Gender",
    type: "text",
    icon: TwoUsers,
    endIcon: ArrowDownSquare,
  },
  { name: "dob", placeholder: "Date of Birth", type: "text", icon: Calendar },
  {
    name: "weight",
    placeholder: "Your Weight (lb)",
    type: "text",
    icon: PaperPlus,
  },
  {
    name: "dailyCalories",
    placeholder: "Total Daily Calories",
    type: "text",
    icon: Swap,
  },
];

const RegisterProfilePage = () => {
  const navigate = useNavigate();
  const { updateProfile } = useUser();
  const [form, setForm] = useState<ProfileForm>({
    gender: "",
    dob: "",
    weight: "",
    dailyCalories: "",
  });
  const [formErrors, setFormErrors] = useState<{
    [key in keyof ProfileForm]: string;
  }>({ gender: "", dob: "", weight: "", dailyCalories: "" });

  const handleChange = (name: keyof ProfileForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = async () => {
    const errors = validateProfile(form);

    setFormErrors((prev) => ({
      ...prev,
      ...errors,
    }));

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      await updateProfile(form.weight, form.dailyCalories);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  return (
    <PageContainer variant="centered">
      <Panel>
        <Stack gap={1}>
          <img src={heroImage} alt="Fitness Illustration" className="-mt-20" />
          <Box className="text-center">
            <h4 className="text-h4 font-bold">Lets Complete your profile</h4>
            <p>It will help us know more about you!</p>
          </Box>

          {formFields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
              value={form[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              icon={field.icon}
              endIcon={field.endIcon || undefined}
              errorText={formErrors[field.name]}
            />
          ))}
          <Box>
            <Button text="Next" onClick={handleNext} />
          </Box>
        </Stack>
      </Panel>
    </PageContainer>
  );
};

export default RegisterProfilePage;
