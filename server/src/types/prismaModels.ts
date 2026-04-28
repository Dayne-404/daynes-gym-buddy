import { prisma } from "../config/prisma";

export const PrismaModels = {
  user: prisma.user,
  routine: prisma.routine,
  calorie: prisma.calorie,
  weight: prisma.weight,
  routineExercise: prisma.routineExercise,
  exercise: prisma.exercise,
} as const;

export type PrismaModelName = keyof typeof PrismaModels;

export const userOwnedModel = new Set<PrismaModelName>([
  "routine",
  "calorie",
  "weight",
  "routineExercise",
]);

export const hasDateField = new Set<PrismaModelName>(["calorie", "weight"]);
