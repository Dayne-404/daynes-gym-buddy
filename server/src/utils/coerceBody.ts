import { PrismaModelName } from "../types/prismaModels";

type FieldType = "number" | "date" | "boolean";

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

export const coerceBody = (modelName: PrismaModelName, body: any) => {
  const coercionMap = modelCoercionMap[modelName];

  if (!coercionMap) {
    return body;
  }

  const newBody = { ...body };

  for (const key in coercionMap) {
    if (key in newBody) {
      const fieldType = coercionMap[key];
      const value = newBody[key];

      if (value === null || value === undefined) continue;

      if (fieldType === "number") newBody[key] = Number(value);
      if (fieldType === "date") newBody[key] = new Date(value);
      if (fieldType === "boolean")
        newBody[key] = value === "true" || value === true;
    }
  }

  return newBody;
};
