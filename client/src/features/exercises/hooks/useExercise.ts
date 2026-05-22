import { useEffect, useState } from "react";
import { fetchExercise } from "../services/fetchExercise";
import type { Exercise } from "../types/exercise.types";

export const useExercise = (id: number) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loadedId, setLoadedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchExercise(id)
      .then((data) => { if (active) { setExercise(data); setLoadedId(id); setError(null); } })
      .catch((err) => { if (active) { setError((err as Error).message); setLoadedId(id); } });
    return () => { active = false; };
  }, [id]);

  return { exercise, loading: loadedId !== id, error };
};
