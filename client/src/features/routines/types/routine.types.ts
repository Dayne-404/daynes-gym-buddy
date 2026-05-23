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
