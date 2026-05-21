import { useCallback, useEffect, useRef, useState } from "react";
import { fetchRoutines } from "../services/fetchRoutines";
import type { Routine } from "../../dashboard/types/dashboard.types";

const DEBOUNCE_MS = 300;

interface RoutinesState {
  routines: Routine[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export const useRoutines = (limit?: number) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [overallTotal, setOverallTotal] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [state, setState] = useState<RoutinesState>({
    routines: [],
    total: 0,
    page: 1,
    totalPages: 1,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchRoutines({ page: 1, limit: 1 }).then((r) => setOverallTotal(r.total));
  }, []);

  const load = useCallback(async (searchTerm: string, currentPage: number) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const result = await fetchRoutines({ search: searchTerm, page: currentPage, limit });
      setState({
        routines: result.routines,
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
