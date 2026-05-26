import { create } from "node:domain";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const createUser = await prisma.user.create({
    data: {
      email: "dayne@example.com",
      passwordHash: await argon2.hash("password"),
      firstName: "Dayne",
      lastName: "Dellaire",
      avatarColor: "#ff0000",
      goalWeightLb: 180,
      dailyCalorieGoal: 2500,
    },
  });

  const createCalorieEntry = await prisma.calorie.create({
    data: {
      userId: createUser.id,
      date: new Date(),
      calories: 2000,
      calorieGoalSnapShot: 2500,
    },
  });

  await prisma.calorie.create({
    data: {
      userId: createUser.id,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      calories: 2200,
      calorieGoalSnapShot: 2500,
    },
  });

  const createWeightEntry = await prisma.weight.create({
    data: {
      userId: createUser.id,
      date: new Date(),
      weightLb: 190,
    },
  });

  await prisma.weight.create({
    data: {
      userId: createUser.id,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      weightLb: 192,
    },
  });

  await prisma.weight.create({
    data: {
      userId: createUser.id,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      weightLb: 195,
    },
  });

  const createExerciseEntry = await prisma.exercise.create({
    data: {
      name: "Leg Press",
      muscleGroup: "Legs",
      description:
        "A compound exercise that targets the quadriceps, glutes, and hamstrings.",
    },
  });

  await prisma.exercise.create({
    data: {
      name: "Bench Press",
      muscleGroup: "Chest",
      description:
        "A compound exercise that targets the pectoral muscles, deltoids, and triceps.",
    },
  });

  await prisma.exercise.create({
    data: {
      name: "Deadlift",
      muscleGroup: "Back",
      description:
        "A compound exercise that targets the entire posterior chain, including the glutes, hamstrings, and lower back.",
    },
  });

  const createRoutine = await prisma.routine.create({
    data: {
      userId: createUser.id,
      name: "Full Body Routine",
      description: "A balanced routine that targets all major muscle groups.",
    },
  });

  const createRoutineExercise = await prisma.routineExercise.create({
    data: {
      orderIndex: 0,
      routineId: createRoutine.id,
      exerciseId: createExerciseEntry.id,
      targetSets: 3,
      targetReps: 10,
    },
  });

  console.log("Created user: ", createUser);
  console.log("Created calorie entry: ", createCalorieEntry);
  console.log("Created weight entry: ", createWeightEntry);
  console.log("Created exercise entry: ", createExerciseEntry);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
