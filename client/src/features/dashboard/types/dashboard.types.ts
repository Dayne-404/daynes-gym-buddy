export interface Weight {
  id: number;
  userId: number;
  date: string;
  weightLb: number;
  createdAt: string;
}

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
