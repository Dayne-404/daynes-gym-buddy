import { useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "@/features/user";
import { updateUserProfile } from "../services/updateProfile";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const profileComplete = !!user?.profileComplete;

  const updateProfile = async (goalWeightLb: string, dailyCalories: string): Promise<User> => {
    const updatedUser = await updateUserProfile({
      goalWeightLb,
      dailyCalorieGoal: dailyCalories,
    });

    setUser(updatedUser);
    return updatedUser;
  };

  return (
    <UserContext.Provider value={{ user, setUser, profileComplete, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};
