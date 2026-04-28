import { prisma } from "../config/prisma";

export const safeUserSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  avatarColor: true,
  goalWeightLb: true,
  dailyCalorieGoal: true,
  createdAt: true,
};

export const findUserByIdSafe = (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: safeUserSelect,
  });
};

export const findUserPasswordHash = (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: { passwordHash: true },
  });
};

export const updateUserById = (id: number, data: any) => {
  return prisma.user.update({
    where: { id },
    data,
    select: safeUserSelect,
  });
};

export const updateUserPasswordHash = (id: number, passwordHash: string) => {
  return prisma.user.update({
    where: { id },
    data: { passwordHash },
  });
};
