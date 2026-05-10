import { apiRequest } from "@/services/ApiClient";
import type { Calorie } from "../types/dashboard.types";

export const fetchTodayCalories = async (): Promise<Calorie[]> => {
  const today = new Date().toISOString().split("T")[0];
  const data = await apiRequest<{ calories: Calorie[] }>({
    endpoint: `/calories?from=${today}&to=${today}`,
  });
  return data.calories;
};
