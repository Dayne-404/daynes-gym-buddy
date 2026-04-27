import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { PrismaModelName, userOwnedModel } from "../../types/prismaModels";
import ApiError from "../../utils/ApiError";
import { coerceBody } from "../../utils/coerceBody";

const sanitizeData = (data: any, fieldType: PrismaModelName) => {
  const sanitized = { ...data };

  delete sanitized.id;
  delete sanitized.userId;
  delete sanitized.createdAt;

  return coerceBody(fieldType, sanitized);
};

export const createCrudControllers = (modelName: PrismaModelName) => {
  const model = prisma[modelName];
  const isUserOwned = userOwnedModel.has(modelName);

  const getAll = async (req: Request, res: Response) => {
    const where = isUserOwned ? { userId: req.userId! } : {};

    const data = await (model as any).findMany({ where });

    res.json(data);
  };

  const getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!id) {
      throw new ApiError(400, "Invalid ID parameter must be a number");
    }

    const where = isUserOwned ? { id, userId: req.userId! } : { id };

    const data = await (model as any).findUnique({ where });

    if (!data) {
      throw new ApiError(404, "Resource not found");
    }

    res.json({ data });
  };

  const create = async (req: Request, res: Response) => {
    const data = isUserOwned
      ? { ...sanitizeData(req.body, modelName), userId: req.userId! }
      : sanitizeData(req.body, modelName);

    const created = await (model as any).create({ data });

    res.status(201).json({ data: created });
  };

  const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const editingData = sanitizeData(req.body, modelName);

    if (isUserOwned) {
      const existing = await (model as any).findFirst({
        where: { id, userId: req.userId! },
      });

      if (!existing) {
        return res.status(404).json({ error: "Resource not found" });
      }
    }

    const updated = await (model as any).update({
      where: { id },
      data: editingData,
    });

    res.json({ data: updated });
  };

  const remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isUserOwned) {
      const existing = await (model as any).findFirst({
        where: { id, userId: req.userId! },
      });

      if (!existing) {
        return res.status(404).json({ error: "Resource not found" });
      }
    }

    const removed = await (model as any).delete({
      where: { id },
    });

    res.json({ data: removed });
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};
