import { useEffect, useState } from "react";
import { fetchCaloriesForDate } from "@/features/calories";
import type { Calorie } from "@/features/calories";
import { fetchWeights } from "@/features/weight";
import { fetchRoutines } from "../services/fetchRoutines";
import type { Routine } from "../types/dashboard.types";
import type { Weight } from "@/features/weight";
import { localDateString } from "@/utils/date";

const today = localDateString();

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
        const caloriesConsumed = calories.reduce(
          (sum: number, e: Calorie) => sum + e.calories,
          0,
        );

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
