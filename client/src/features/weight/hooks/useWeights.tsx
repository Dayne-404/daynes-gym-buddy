import { useCallback, useEffect, useState } from "react";
import type { Weight } from "../types/weight.types";
import { fetchWeights } from "../services/fetchWeights";
import { logWeight as logWeightService } from "../services/logWeight";
import { updateWeight as updateWeightService } from "../services/updateWeight";
import { localDateString } from "@/utils/date";

const today = localDateString();

interface WeightsState {
  entries: Weight[];
  todayEntry: Weight | null;
  previousEntry: Weight | null;
  loading: boolean;
  error: string | null;
}

export const useWeights = () => {
  const [state, setState] = useState<WeightsState>({
    entries: [],
    todayEntry: null,
    previousEntry: null,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const raw = await fetchWeights();
      const sorted = [...raw].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      

      const todayEntry = sorted.find((e) => e.date.startsWith(today)) ?? null;
      const previousEntry = sorted.find((e) => e.date.split("T")[0] < today) ?? null;

      setState({ entries: sorted, todayEntry, previousEntry, loading: false, error: null });
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: (err as Error).message }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const logWeight = async (weightLb: number, date: string) => {
    if (state.todayEntry) {
      await updateWeightService(state.todayEntry.id, weightLb);
    } else {
      await logWeightService(weightLb, date);
    }
    await load();
  };

  return { ...state, logWeight };
};
