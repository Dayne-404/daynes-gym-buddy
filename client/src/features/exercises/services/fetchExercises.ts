import { apiRequest } from "@/services/ApiClient";
import type { Exercise } from "../types/exercise.types";

export interface PaginatedExercises {
  exercises: Exercise[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface FetchExercisesParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const fetchExercises = async (params: FetchExercisesParams = {}): Promise<PaginatedExercises> => {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  const qs = query.toString();
  return apiRequest<PaginatedExercises>({
    endpoint: `/exercises${qs ? `?${qs}` : ""}`,
  });
};
