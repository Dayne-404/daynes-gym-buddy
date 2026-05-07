import checkProfileComplete from "../utils/checkProfileComplete";

export interface PublicUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarColor: string;
  goalWeightLb?: number;
  dailyCalorieGoal?: number;
  profileComplete: boolean;
}

export const toPublicUser = (user: any): PublicUser => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarColor: user.avatarColor,
    dailyCalorieGoal: user.dailyCalorieGoal,
    goalWeightLb: user.goalWeightLb,
    profileComplete: checkProfileComplete(user)
  };
};

/**
 * Payload stored in access tokens.
 * Sent to the frontend for authorization.
 */
export interface AccessTokenPayload {
  userId: number;
  email: string;
  tokenVersion: number;
}

export interface profileCompleteFields {
  goalWeightLb: number | null;
  dailyCalorieGoal: number | null;
}

/**
 * Payload stored in refresh tokens.
 * Used only to issue new access tokens.
 */
export interface RefreshTokenPayload {
  userId: number;
  tokenVersion: number;
}
