import { apiRequest } from "@/services/ApiClient";
import type { Weight } from "../types/dashboard.types";

export const fetchWeights = async (): Promise<Weight[]> => {
  const data = await apiRequest<{ weights: Weight[] }>({
    endpoint: "/weights",
  });
  return data.weights;
};
