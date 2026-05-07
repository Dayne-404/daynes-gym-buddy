/**
 * Payload stored in access tokens.
 * Sent to the frontend for authorization.
 */
export interface AccessTokenPayload {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarColor: string;
  tokenVersion: number;
  profileComplete: boolean;
}

export interface profileCompleteFields {
  goalWeightLb: number | null,
  dailyCalorieGoal: number | null,
}

/**
 * Payload stored in refresh tokens.
 * Used only to issue new access tokens.
 */
export interface RefreshTokenPayload {
  userId: number;
  tokenVersion: number;
}
