import { useEffect, useState } from "react";
import { fetchCaloriesForDate } from "@/features/calories/services/fetchCalories";
import type { Calorie } from "@/features/calories/types/calories.types";
import { fetchWeights } from "../services/fetchWeights";
import { fetchRoutines } from "../services/fetchRoutines";
import type { Routine, Weight } from "../types/dashboard.types";

const today = new Date().toISOString().split("T")[0];

interface DashboardData {
  caloriesConsumed: number;
  currentWeight: number | null;
  previousWeight: number | null;
  routines: Routine[];
  loading: boolean;
  error: string | null;
}

export const useDashboardData = (): DashboardData => {
  const [state, setState] = useState<DashboardData>({
    caloriesConsumed: 0,
    currentWeight: null,
    previousWeight: null,
    routines: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    Promise.all([fetchCaloriesForDate(today), fetchWeights(), fetchRoutines()])
      .then(([calories, weights, routines]) => {
        const caloriesConsumed = calories.reduce((sum: number, e: Calorie) => sum + e.calories, 0);

        const sorted = [...weights].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        const [latest, previous] = sorted as [Weight?, Weight?];

        setState({
          caloriesConsumed,
          currentWeight: latest?.weightLb ?? null,
          previousWeight: previous?.weightLb ?? null,
          routines,
          loading: false,
          error: null,
        });
      })
      .catch((err: Error) => {
        setState((prev) => ({ ...prev, loading: false, error: err.message }));
      });
  }, []);

  return state;
};
