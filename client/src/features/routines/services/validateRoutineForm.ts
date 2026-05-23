import type { RoutineFormValues } from "../types/routineForm.types";

type RoutineFormErrors = { [K in keyof RoutineFormValues]: string };

export const validateRoutineForm = (
  values: RoutineFormValues,
): RoutineFormErrors => ({
  name: values.name.trim() ? "" : "Routine name is required",
  description: "",
});
