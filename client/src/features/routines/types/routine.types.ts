export interface Routine {
  id: number;
  userId: number;
  name: string;
  description: string | null;
  icon: string | null;
  createdAt: string;
  _count: {
    routineExercises: number;
  };
}

export interface RoutineExercise {
  id: number;
  routineId: number;
  exerciseId: number;
  orderIndex: number;
  targetSets: number;
  targetReps: number;
  targetWeightLb: number | null;
  createdAt: string;
  exercise: {
    id: number;
    name: string;
    muscleGroup: string;
    description: string | null;
  };
}

export interface RoutineDetail extends Omit<Routine, "_count"> {
  routineExercises: RoutineExercise[];
}
