import { apiRequest } from "@/services/ApiClient";
import type { RoutineDetail } from "../types/routine.types";

export const fetchRoutine = async (id: number): Promise<RoutineDetail> => {
  const { routine } = await apiRequest<{ routine: RoutineDetail }>({
    endpoint: `/routines/${id}`,
  });
  return routine;
};
