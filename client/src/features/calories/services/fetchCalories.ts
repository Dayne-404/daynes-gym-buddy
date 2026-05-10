import { apiRequest } from "@/services/ApiClient";
import type { Calorie } from "../types/calories.types";

export const fetchCaloriesForDate = async (date: string): Promise<Calorie[]> => {
  const data = await apiRequest<{ calories: Calorie[] }>({
    endpoint: `/calories?from=${date}&to=${date}`,
  });
  return data.calories;
};
