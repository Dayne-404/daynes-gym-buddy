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
}

/**
 * Payload stored in refresh tokens.
 * Used only to issue new access tokens.
 */
export interface RefreshTokenPayload {
  userId: number;
  tokenVersion: number;
}
