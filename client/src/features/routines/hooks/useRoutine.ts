import { useEffect, useState } from "react";
import { fetchRoutine } from "../services/fetchRoutine";
import type { RoutineDetail } from "../types/routine.types";

export const useRoutine = (id: number) => {
  const [routine, setRoutine] = useState<RoutineDetail | null>(null);
  const [loadedId, setLoadedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchRoutine(id)
      .then((data) => { if (active) { setRoutine(data); setLoadedId(id); setError(null); } })
      .catch((err) => { if (active) { setError((err as Error).message); setLoadedId(id); } });
    return () => { active = false; };
  }, [id]);

  return { routine, loading: loadedId !== id, error };
};
