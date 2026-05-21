import { useCallback, useEffect, useRef, useState } from "react";
import { fetchExercises } from "../services/fetchExercises";
import type { Exercise } from "../types/exercise.types";

const DEBOUNCE_MS = 300;

interface ExercisesState {
  exercises: Exercise[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export const useExercises = (limit?: number) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [overallTotal, setOverallTotal] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [state, setState] = useState<ExercisesState>({
    exercises: [],
    total: 0,
    page: 1,
    totalPages: 1,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchExercises({ page: 1, limit: 1 }).then((r) => setOverallTotal(r.total));
  }, []);

  const load = useCallback(async (searchTerm: string, currentPage: number) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const result = await fetchExercises({ search: searchTerm, page: currentPage, limit });
      setState({
        exercises: result.exercises,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (err as Error).message,
      }));
    }
  }, [limit]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      load(search, page);
    }, search ? DEBOUNCE_MS : 0);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, page, load]);

  const handleSetSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return {
    ...state,
    overallTotal,
    search,
    setSearch: handleSetSearch,
    setPage,
  };
};
