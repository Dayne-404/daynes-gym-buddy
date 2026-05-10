export interface Calorie {
  id: number;
  userId: number;
  date: string;
  calories: number;
  calorieGoalSnapShot: number | null;
  createdAt: string;
}
