export interface RoutineFormValues {
  name: string;
  description: string;
}

export interface RoutineExerciseFormValues {
  targetSets: number;
  targetReps: number;
  targetWeightLb: number | null;
  exercise: {
    id: number;
    name: string;
    muscleGroup: string;
  };
}

export interface ExerciseEntry {
  uid: string;
  values: RoutineExerciseFormValues;
}
