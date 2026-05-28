export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarColor: string;
  email: string;
  goalWeightLb: number | null;
  dailyCalorieGoal: number | null;
  profileComplete: boolean;
  createdAt: string;
}
