import { useCallback, useEffect, useState } from "react";
import { fetchCaloriesForDate } from "../services/fetchCalories";
import { logCalorie as logCalorieService } from "../services/logCalorie";
import { deleteCalorie as deleteCalorieService } from "../services/deleteCalorie";
import type { Calorie } from "../types/calories.types";

interface CaloriesState {
  entries: Calorie[];
  totalCalories: number;
  loading: boolean;
  error: string | null;
}

export const useCalories = (date: string) => {
  const [state, setState] = useState<CaloriesState>({
    entries: [],
    totalCalories: 0,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const entries = await fetchCaloriesForDate(date);
      const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0);
      setState({ entries, totalCalories, loading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (err as Error).message,
      }));
    }
  }, [date]);

  useEffect(() => {
    load();
  }, [load]);

  const logCalorie = async (calories: number) => {
    await logCalorieService(calories, date);
    await load();
  };

  const deleteCalorie = async (id: number) => {
    await deleteCalorieService(id);
    await load();
  };

  return { ...state, logCalorie, deleteCalorie };
};
