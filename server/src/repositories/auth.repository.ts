import { prisma } from "../config/prisma";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const createUser = (data: {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  avatarColor: string;
}) => {
  return prisma.user.create({ data });
};

export const getUserRefreshTokens = (userId: number) => {
  return prisma.refreshToken.findMany({ where: { userId } });
};

export const deleteRefreshTokenById = (id: number) => {
  return prisma.refreshToken.deleteMany({ where: { id } });
};

export const deleteRefreshTokenByHash = async (tokenHash: string) => {
  await prisma.refreshToken.deleteMany({
    where: {
      tokenHash: tokenHash,
    },
  });
};
