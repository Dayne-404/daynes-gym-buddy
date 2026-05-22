import { apiRequest } from "@/services/ApiClient";
import type { Exercise } from "../types/exercise.types";

export const fetchExercise = async (id: number): Promise<Exercise> => {
  const { exercise } = await apiRequest<{ exercise: Exercise }>({
    endpoint: `/exercises/${id}`,
  });
  return exercise;
};
