import { useEffect, useState } from "react";
import { fetchCaloriesForDate } from "@/features/calories";
import type { Calorie } from "@/features/calories";
import { fetchWeights } from "@/features/weight";
import { fetchRoutines } from "../../routines/services/fetchRoutines";
import { fetchExercises } from "../../exercises/services/fetchExercises";
import type { Routine } from "@/features/routines/types/routine.types";
import type { Weight } from "@/features/weight";
import { localDateString } from "@/utils/date";

const today = localDateString();

interface DashboardData {
  caloriesConsumed: number;
  currentWeight: number | null;
  previousWeight: number | null;
  routines: Routine[];
  totalExercises: number;
  loading: boolean;
  error: string | null;
}

export const useDashboardData = (): DashboardData => {
  const [state, setState] = useState<DashboardData>({
    caloriesConsumed: 0,
    currentWeight: null,
    previousWeight: null,
    routines: [],
    totalExercises: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    Promise.all([fetchCaloriesForDate(today), fetchWeights(), fetchRoutines({ page: 1, limit: 3 }), fetchExercises({ limit: 1 })])
      .then(([calories, weights, { routines }, { total: totalExercises }]) => {
        const caloriesConsumed = calories.reduce(
          (sum: number, e: Calorie) => sum + e.calories,
          0,
        );

        const sorted = [...weights].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        const todayEntry = sorted.find((w) => w.date.startsWith(today)) as Weight | undefined;
        const previousEntry = sorted.find((w) => w.date.split("T")[0] < today) as Weight | undefined;

        setState({
          caloriesConsumed,
          currentWeight: todayEntry?.weightLb ?? previousEntry?.weightLb ?? null,
          previousWeight: todayEntry ? previousEntry?.weightLb ?? null : null,
          routines,
          totalExercises,
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
