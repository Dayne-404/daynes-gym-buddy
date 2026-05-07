declare global {
  export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    avatarColor: string;
    email: string;
    profileComplete: boolean;
  }
}

export {};
