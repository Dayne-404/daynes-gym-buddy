import { apiRequest } from "@/services/ApiClient";
import type { Exercise } from "../types/exercise.types";
import type { ExerciseFormValues } from "../types/exerciseForm.types";

export const createExercise = async (values: ExerciseFormValues): Promise<Exercise> => {
  const { exercise } = await apiRequest<{ exercise: Exercise }>({
    endpoint: "/exercises",
    method: "POST",
    body: JSON.stringify({
      name: values.name.trim(),
      muscleGroup: values.muscleGroup.trim(),
      ...(values.description.trim() && { description: values.description.trim() }),
      ...(values.mediaUrl.trim() && { mediaUrl: values.mediaUrl.trim() }),
    }),
  });
  return exercise;
};
