import ApiError from "../utils/ApiError";
import { coerceBody } from "../utils/coerceBody";
import { buildDateFilter } from "../utils/dateFilter";
import {
  hasDateField,
  PrismaModelName,
  userOwnedModel,
} from "../types/prismaModels";

import * as repo from "../repositories/crud.repository";

const modelIncludes: Partial<Record<PrismaModelName, any>> = {
  routine: { _count: { select: { routineExercises: true } } },
};

const sanitizeData = (data: any, fieldType: PrismaModelName) => {
  const sanitized = { ...data };
  delete sanitized.id;
  delete sanitized.userId;
  delete sanitized.createdAt;
  return coerceBody(fieldType, sanitized);
};

export const createCrudService = (modelName: PrismaModelName) => {
  const isUserOwned = userOwnedModel.has(modelName);

  const getAll = async (userId: number | undefined, query: any) => {
    const createdAtFilter = buildDateFilter(query, "createdFrom", "createdTo");

    const date = hasDateField.has(modelName)
      ? buildDateFilter(query)
      : undefined;

    const where: any = {
      ...(isUserOwned && { userId }),
      ...(createdAtFilter && { createdAt: createdAtFilter }),
      ...(date && { date }),
    };

    return repo.findMany(modelName, where, modelIncludes[modelName]);
  };

  const getById = async (id: number, userId?: number) => {
    if (Number.isNaN(id)) throw ApiError.badRequest("Invalid ID");

    const where = isUserOwned ? { id, userId } : { id };

    const data = await repo.findUnique(modelName, where);
    if (!data) throw ApiError.notFound(modelName);

    return data;
  };

  const create = async (body: any, userId?: number) => {
    const data = isUserOwned
      ? { ...sanitizeData(body, modelName), userId }
      : sanitizeData(body, modelName);

    return repo.createOne(modelName, data);
  };

  const update = async (id: number, body: any, userId?: number) => {
    const data = sanitizeData(body, modelName);

    if (isUserOwned) {
      const existing = await repo.findFirst(modelName, { id, userId });
      if (!existing) throw ApiError.notFound(modelName);
    }

    return repo.updateOne(modelName, id, data);
  };

  const remove = async (id: number, userId?: number) => {
    if (isUserOwned) {
      const existing = await repo.findFirst(modelName, { id, userId });
      if (!existing) throw ApiError.notFound(modelName);
    }

    return repo.deleteOne(modelName, id);
  };

  return { getAll, getById, create, update, remove };
};