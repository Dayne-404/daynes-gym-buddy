import { apiRequest } from "@/services/ApiClient";
import type { Routine } from "../types/routine.types";
import type { RoutineExerciseFormValues, RoutineFormValues } from "../types/routineForm.types";

export const createRoutine = async (
  values: RoutineFormValues,
  routineExercises: RoutineExerciseFormValues[],
): Promise<Routine> => {
  const { routine } = await apiRequest<{ routine: Routine }>({
    endpoint: "/routines",
    method: "POST",
    body: JSON.stringify({
      name: values.name.trim(),
      ...(values.description.trim() && { description: values.description.trim() }),
      routineExercises: routineExercises.map((re, index) => ({
        exerciseId: re.exercise.id,
        orderIndex: index,
        targetSets: re.targetSets,
        targetReps: re.targetReps,
        ...(re.targetWeightLb !== null && { targetWeightLb: re.targetWeightLb }),
      })),
    }),
  });
  return routine;
};
