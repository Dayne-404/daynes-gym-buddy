import { useEffect, useState } from "react";
import { fetchExercise } from "../services/fetchExercise";
import type { Exercise } from "../types/exercise.types";

interface ExerciseState {
  exercise: Exercise | null;
  loading: boolean;
  error: string | null;
}

export const useExercise = (id: number) => {
  const [state, setState] = useState<ExerciseState>({
    exercise: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState({ exercise: null, loading: true, error: null });
    fetchExercise(id)
      .then((exercise) => setState({ exercise, loading: false, error: null }))
      .catch((err) => setState({ exercise: null, loading: false, error: (err as Error).message }));
  }, [id]);

  return state;
};
