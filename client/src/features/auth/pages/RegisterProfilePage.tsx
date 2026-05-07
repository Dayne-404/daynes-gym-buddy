import PageContainer from "@/app/layouts/PageContainer";
import Stack from "@/app/layouts/Stack";
import Input from "@/components/Input";
import {
  TwoUsers,
  Calendar,
  PaperPlus,
  Swap,
  ArrowDownSquare,
  type IconProps,
} from "react-iconly";
import { useState, type FC } from "react";
import Section from "@/app/layouts/Section";
import Card from "@/app/layouts/Card";
import Button from "@/components/Button";
import heroImage from "@/assets/woman_lifting.svg";
import { apiRequest } from "@/services/apiClient";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/features/user";

interface RegisterProfileForm {
  gender: string;
  dob: string;
  weight: string;
  dailyCalories: string;
}

const formFields: {
  name: keyof RegisterProfileForm;
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
  const user = useUser();

  const [form, setForm] = useState<RegisterProfileForm>({
    gender: "",
    dob: "",
    weight: "",
    dailyCalories: "",
  });

  const handleChange = (name: keyof RegisterProfileForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onNext = async () => {
    try {
      const data = await apiRequest<{user: User}>({
        endpoint: "/users/me",
        method: "PUT",
        body: JSON.stringify({
          goalWeightLb: form.weight,
          dailyCalorieGoal: form.dailyCalories,
        }),
      });

      if (!data) {
        throw new Error("Error updating profile");
      }

      console.log("Sucessfully registered");

      console.log(data.user);
      user.setUser(data.user);

      navigate("/register/profile", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer variant="centered">
      <Card>
        <Stack gap={4}>
          <img src={heroImage} alt="Fitness Illustration" className="-mt-20" />
          <Section className="text-center">
            <h4 className="text-h4 font-bold">Lets Complete your profile</h4>
            <p>It will help us know more about you!</p>
          </Section>

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
            />
          ))}
          <Section>
            <Button text="Next" onClick={onNext} />
          </Section>
        </Stack>
      </Card>
    </PageContainer>
  );
};

export default RegisterProfilePage;
