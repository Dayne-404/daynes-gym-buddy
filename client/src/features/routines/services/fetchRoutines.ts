import { apiRequest } from "@/services/ApiClient";
import type { Routine } from "../../dashboard/types/dashboard.types";

export interface PaginatedRoutines {
  routines: Routine[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface FetchRoutinesParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const fetchRoutines = async (params: FetchRoutinesParams = {}): Promise<PaginatedRoutines> => {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  const qs = query.toString();
  return apiRequest<PaginatedRoutines>({
    endpoint: `/routines${qs ? `?${qs}` : ""}`,
  });
};
