import { prisma } from "../config/prisma";
import { PrismaModelName } from "../types/prismaModels";

export const getModel = (modelName: PrismaModelName) => {
  return prisma[modelName] as any;
};

export const findMany = async (
  modelName: PrismaModelName,
  where: any,
  include?: any,
  skip?: number,
  take?: number,
  orderBy?: any
) => {
  return getModel(modelName).findMany({
    where,
    ...(include && { include }),
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take }),
    ...(orderBy && { orderBy }),
  });
};

export const countMany = async (
  modelName: PrismaModelName,
  where: any
) => {
  return getModel(modelName).count({ where }) as Promise<number>;
};

export const findUnique = async (modelName: PrismaModelName, where: any, include?: any) => {
  return getModel(modelName).findUnique({ where, ...(include && { include }) });
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