import type { ExerciseFormValues } from "../types/exerciseForm.types";

type ExerciseFormErrors = { [K in keyof ExerciseFormValues]: string };

export const validateExerciseForm = (values: ExerciseFormValues): ExerciseFormErrors => ({
  name: values.name.trim() ? "" : "Exercise name is required",
  muscleGroup: values.muscleGroup.trim() ? "" : "Muscle group is required",
  description: "",
  mediaUrl: "",
});
