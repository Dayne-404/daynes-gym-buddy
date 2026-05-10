import { apiRequest } from "@/services/ApiClient";
import type { Calorie } from "../types/calories.types";

export const logCalorie = async (calories: number, date: string): Promise<Calorie> => {
  const data = await apiRequest<{ calorie: Calorie }>({
    endpoint: "/calories",
    method: "POST",
    body: JSON.stringify({ calories, date }),
  });
  return data.calorie;
};
