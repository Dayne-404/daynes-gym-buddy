import { Stack } from "@/app/layout";
import { Button, Input, Textarea } from "@/components";
import { Edit, Category, Document, Paper, type IconProps } from "react-iconly";
import type { ExerciseFormValues } from "../types/exerciseForm.types";
import type { FC } from "react";

interface ExerciseFormField {
  name: Exclude<keyof ExerciseFormValues, "description">;
  placeholder: string;
  icon: FC<IconProps>;
}

const fields: ExerciseFormField[] = [
  { name: "name", placeholder: "Exercise name", icon: Edit },
  { name: "muscleGroup", placeholder: "Muscle group", icon: Category },
  { name: "mediaUrl", placeholder: "Media URL (optional)", icon: Paper },
];

interface ExerciseFormProps {
  values: ExerciseFormValues;
  errors: { [K in keyof ExerciseFormValues]: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  loading?: boolean;
  submitText?: string;
}

const ExerciseForm = ({
  values,
  errors,
  onChange,
  onSubmit,
  loading = false,
  submitText = "Save",
}: ExerciseFormProps) => (
  <Stack gap={4}>
    <Stack gap={1}>
      {fields.map(({ name, placeholder, icon }) => (
        <Input
          key={name}
          name={name}
          placeholder={placeholder}
          value={values[name]}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
          icon={icon}
          errorText={errors[name]}
          disabled={loading}
        />
      ))}
      <Textarea
        name="description"
        placeholder="Description (optional)"
        value={values.description}
        onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
        icon={Document}
        errorText={errors.description}
        disabled={loading}
      />
    </Stack>
    <Button text={submitText} onClick={onSubmit} disabled={loading} />
  </Stack>
);

export default ExerciseForm;
