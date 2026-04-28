import { PrismaModelName } from "../types/prismaModels";

// Supported primitive coercions from HTTP -> Prisma
type FieldType = "number" | "date" | "boolean";

/**
 * Map of Prisma models -> fields that require type coercion.
 * Only fields listed here will be transformed.
 */
type ModelCoercionMap = Record<string, Record<string, FieldType>>;

export const modelCoercionMap: ModelCoercionMap = {
  calorie: {
    calories: "number",
    calorieGoalSnapShot: "number",
    date: "date",
  },
  weight: {
    weight: "number",
    date: "date",
  },
  routineExercise: {
    sets: "number",
    reps: "number",
    restTimeSeconds: "number",
  },
  user: {
    goalWeightLb: "number", //TODO: should this be a float?
    dailyCalorieGoal: "number",
    tokenVersion: "number",
  },
};

/**
 * Coerces incoming request body values into correct primitive types
 * based on Prisma model field expectations.
 *
 * Prevents issues where numbers/dates arrive as strings from HTTP.
 */
export const coerceBody = (
  modelName: PrismaModelName,
  body: Record<string, unknown>,
) => {
  const coercionMap = modelCoercionMap[modelName];
  if (!coercionMap) return body;

  const newBody: Record<string, unknown> = { ...body };

  for (const key in coercionMap) {
    if (key in newBody) {
      const fieldType = coercionMap[key];
      const value = newBody[key];

      if (value === null || value === undefined) continue;

      if (fieldType === "number") newBody[key] = Number(value);
      if (fieldType === "date") newBody[key] = new Date(value as string);
      if (fieldType === "boolean")
        newBody[key] = value === "true" || value === true;
    }
  }

  return newBody;
};
