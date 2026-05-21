import { useCallback, useEffect, useState } from "react";
import { fetchRoutines } from "../services/fetchRoutines";
import type { Routine } from "../../dashboard/types/dashboard.types";

interface RoutinesState {
  routines: Routine[];
  loading: boolean;
  error: string | null;
}

export const useRoutines = () => {
  const [state, setState] = useState<RoutinesState>({
    routines: [],
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const routines = await fetchRoutines();
      setState({ routines, loading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (err as Error).message,
      }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state };
};
