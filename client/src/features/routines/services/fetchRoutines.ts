import { apiRequest } from "@/services/ApiClient";
import type { Routine } from "../../dashboard/types/dashboard.types";

export const fetchRoutines = async (): Promise<Routine[]> => {
  const data = await apiRequest<{ routines: Routine[] }>({
    endpoint: "/routines",
  });
  return data.routines;
};
