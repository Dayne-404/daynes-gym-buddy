import { apiRequest } from "@/services/ApiClient";

interface UpdateProfilePayload {
  goalWeightLb: string;
  dailyCalorieGoal: string;
}

export const updateUserProfile = async (
  payload: UpdateProfilePayload
): Promise<User> => {
  const data = await apiRequest<{ user: User }>({
    endpoint: "/users/me",
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!data) {
    throw new Error("Failed to update profile");
  }

  return data.user;
};