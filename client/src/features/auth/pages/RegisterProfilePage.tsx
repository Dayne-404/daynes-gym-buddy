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
import { type FC } from "react";
import Section from "@/app/layouts/Section";
import Card from "@/app/layouts/Card";
import Button from "@/components/Button";
import heroImage from "@/assets/woman_lifting.svg";

interface RegisterProfileForm {
  gender: string;
  dob: string;
  weight: string;
  height: string;
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
  { name: "height", placeholder: "Your Height (ft)", type: "text", icon: Swap },
];

const RegisterProfilePage = () => {
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
              value={""}
              onChange={() => {}}
              icon={field.icon}
              endIcon={field.endIcon || undefined}
            />
          ))}
          <Section>
            <Button text="Next" />
          </Section>
        </Stack>
      </Card>
    </PageContainer>
  );
};

export default RegisterProfilePage;
