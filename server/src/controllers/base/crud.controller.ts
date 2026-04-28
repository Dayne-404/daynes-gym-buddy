import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import {
  hasDateField,
  PrismaModelName,
  userOwnedModel,
} from "../../types/prismaModels";
import ApiError from "../../utils/ApiError";
import { coerceBody } from "../../utils/coerceBody";
import { buildDateFilter } from "../../utils/dateFilter";

const sanitizeData = (data: any, fieldType: PrismaModelName) => {
  const sanitized = { ...data };

  delete sanitized.id;
  delete sanitized.userId;
  delete sanitized.createdAt;

  return coerceBody(fieldType, sanitized);
};

/**
 * Generic CRUD controller factory
 * Generates standardized CRUD handlers for Prisma models
 */
export const createCrudControllers = (modelName: PrismaModelName) => {
  const model = prisma[modelName] as any;
  const isUserOwned = userOwnedModel.has(modelName);

  /**
   * GET ALL
   */
  const getAll = async (req: Request, res: Response) => {
    const createdAtFilter = buildDateFilter(
      req.query,
      "createdFrom",
      "createdTo",
    );

    const date = hasDateField.has(modelName)
      ? buildDateFilter(req.query)
      : undefined;

    const where: any = {
      ...(isUserOwned && { userId: req.userId! }),
      ...(createdAtFilter && { createdAt: createdAtFilter }),
      ...(date && { date }),
    };

    const data = await (model as any).findMany({ where });

    res.json({ [`${modelName}s`]: data });
  };

  /**
   * GET BY ID
   */
  const getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw ApiError.badRequest("Invalid ID parameter");
    }

    if (!id) {
      throw ApiError.badRequest("Invalid ID parameter must be a number");
    }

    const where = isUserOwned ? { id, userId: req.userId! } : { id };

    const data = await (model as any).findUnique({ where });

    if (!data) {
      throw ApiError.notFound(modelName);
    }

    res.status(200).json({ [modelName]: data });
  };

  /**
   * CREATE
   */
  const create = async (req: Request, res: Response) => {
    const data = isUserOwned
      ? { ...sanitizeData(req.body, modelName), userId: req.userId! }
      : sanitizeData(req.body, modelName);

    const created = await (model as any).create({ data });

    res.status(201).json({ [modelName]: created });
  };

  /**
   * UPDATE
   */
  const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const editingData = sanitizeData(req.body, modelName);

    if (Number.isNaN(id)) {
      throw ApiError.badRequest("Invalid ID parameter");
    }

    if (isUserOwned) {
      const existing = await (model as any).findFirst({
        where: { id, userId: req.userId! },
      });

      if (!existing) {
        throw ApiError.notFound(modelName);
      }
    }

    const updated = await (model as any).update({
      where: { id },
      data: editingData,
    });

    res.status(201).json({ [modelName]: updated });
  };

  /**
   * DELETE
   */
  const remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw ApiError.badRequest("Invalid ID parameter");
    }

    if (isUserOwned) {
      const existing = await (model as any).findFirst({
        where: { id, userId: req.userId! },
      });

      if (!existing) {
        throw ApiError.notFound(modelName);
      }
    }

    const removed = await (model as any).delete({
      where: { id },
    });

    res.status(200).json({ [modelName]: removed });
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};
