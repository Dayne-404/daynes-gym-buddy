import { prisma } from "../config/prisma";
import { PrismaModelName } from "../types/prismaModels";

export const getModel = (modelName: PrismaModelName) => {
  return prisma[modelName] as any;
};

export const findMany = async (modelName: PrismaModelName, where: any) => {
  return getModel(modelName).findMany({ where });
};

export const findUnique = async (modelName: PrismaModelName, where: any) => {
  return getModel(modelName).findUnique({ where });
};

export const findFirst = async (modelName: PrismaModelName, where: any) => {
  return getModel(modelName).findFirst({ where });
};

export const createOne = async (modelName: PrismaModelName, data: any) => {
  return getModel(modelName).create({ data });
};

export const updateOne = async (
  modelName: PrismaModelName,
  id: number,
  data: any
) => {
  return getModel(modelName).update({ where: { id }, data });
};

export const deleteOne = async (modelName: PrismaModelName, id: number) => {
  return getModel(modelName).delete({ where: { id } });
};