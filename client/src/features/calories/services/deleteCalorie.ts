import { apiRequest } from "@/services/ApiClient";

export const deleteCalorie = async (id: number): Promise<void> => {
  await apiRequest<void>({
    endpoint: `/calories/${id}`,
    method: "DELETE",
  });
};
