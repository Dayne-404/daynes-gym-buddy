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
import { type FC } from "react";
import heroImage from "@/assets/woman_lifting.svg";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/features/user";
import type { ProfileForm } from "../types/form.types";
import { validateProfile } from "../services/validateFields";
import { useForm } from "@/hooks/useForm";

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
    placeholder: "Your Goal Weight (lb)",
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
  const { values, errors, handleChange, submit } = useForm(
    { gender: "", dob: "", weight: "", dailyCalories: "" },
    validateProfile,
  );

  const handleNext = async () => {
    if (!submit()) return;

    try {
      await updateProfile(values.weight, values.dailyCalories);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error updating profile:", error);
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
              value={values[field.name]}
              onChange={handleChange}
              icon={field.icon}
              endIcon={field.endIcon}
              errorText={errors[field.name]}
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
