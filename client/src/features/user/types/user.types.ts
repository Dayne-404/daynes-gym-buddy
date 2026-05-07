declare global {
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    avatarColor: string;
    email: string;
    goalWeightLb?: string | null;
    dailyCalorieGoal?: string | null;
    profileComplete: boolean;
  }
}

export {};
