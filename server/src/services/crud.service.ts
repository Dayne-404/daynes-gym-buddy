import ApiError from "../utils/ApiError";
import { coerceBody } from "../utils/coerceBody";
import { buildDateFilter } from "../utils/dateFilter";
import {
  hasDateField,
  PrismaModelName,
  userOwnedModel,
} from "../types/prismaModels";

import * as repo from "../repositories/crud.repository";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const modelIncludes: Partial<Record<PrismaModelName, any>> = {
  routine: { _count: { select: { routineExercises: true } } },
};

const searchFields: Partial<Record<PrismaModelName, string[]>> = {
  routine: ["name"],
};

const defaultOrder: Partial<Record<PrismaModelName, any>> = {
  routine: { createdAt: "desc" },
};

const DEFAULT_LIMIT = 5;

const sanitizeData = (data: any, fieldType: PrismaModelName) => {
  const sanitized = { ...data };
  delete sanitized.id;
  delete sanitized.userId;
  delete sanitized.createdAt;
  return coerceBody(fieldType, sanitized);
};

export const createCrudService = (modelName: PrismaModelName) => {
  const isUserOwned = userOwnedModel.has(modelName);

  const getAll = async (userId: number | undefined, query: any): Promise<PaginatedResult<any>> => {
    const createdAtFilter = buildDateFilter(query, "createdFrom", "createdTo");

    const date = hasDateField.has(modelName)
      ? buildDateFilter(query)
      : undefined;

    const fields = searchFields[modelName];
    const searchTerm = typeof query.search === "string" ? query.search.trim() : undefined;
    const searchFilter =
      fields && searchTerm
        ? { OR: fields.map((f) => ({ [f]: { contains: searchTerm, mode: "insensitive" } })) }
        : undefined;

    const isPaginated = query.page !== undefined || query.limit !== undefined;
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;

    const where: any = {
      ...(isUserOwned && { userId }),
      ...(createdAtFilter && { createdAt: createdAtFilter }),
      ...(date && { date }),
      ...(searchFilter && searchFilter),
    };

    const [data, total] = await Promise.all([
      repo.findMany(modelName, where, modelIncludes[modelName], isPaginated ? skip : undefined, isPaginated ? limit : undefined, defaultOrder[modelName]),
      repo.countMany(modelName, where),
    ]);

    return { data, total, page, limit, totalPages: isPaginated ? Math.ceil(total / limit) : 1 };
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