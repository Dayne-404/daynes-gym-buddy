export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  description?: string;
  mediaUrl?: string;
  createdAt: string;
  user?: { firstName: string; lastName: string };
}
