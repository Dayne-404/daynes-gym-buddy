import { apiRequest } from "@/services/ApiClient";
import type { Weight } from "../types/weight.types";

export const updateWeight = async (id: number, weightLb: number): Promise<Weight> => {
  const data = await apiRequest<{ weight: Weight }>({
    endpoint: `/weights/${id}`,
    method: "PUT",
    body: JSON.stringify({ weightLb }),
  });
  return data.weight;
};
