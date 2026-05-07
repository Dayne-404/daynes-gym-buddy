import { useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "@/features/user";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const profileComplete = !!user?.profileComplete;

  return (
    <UserContext.Provider value={{ user, setUser, profileComplete }}>
      {children}
    </UserContext.Provider>
  );
};
