import { apiRequest } from "@/services/ApiClient";
import type { Weight } from "../types/weight.types";

export const logWeight = async (weightLb: number, date: string): Promise<Weight> => {
  const data = await apiRequest<{ weight: Weight }>({
    endpoint: "/weights",
    method: "POST",
    body: JSON.stringify({ weightLb, date }),
  });
  return data.weight;
};
