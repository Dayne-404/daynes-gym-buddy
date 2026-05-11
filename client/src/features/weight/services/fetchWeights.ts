import { apiRequest } from "@/services/ApiClient";
import { type Weight } from "@/features/weight";

export const fetchWeights = async (): Promise<Weight[]> => {
  const data = await apiRequest<{ weights: Weight[] }>({
    endpoint: "/weights",
  });
  return data.weights;
};
