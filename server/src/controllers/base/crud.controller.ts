import { Request, Response } from "express";
import { PrismaModelName } from "../../types/prismaModels";
import { createCrudService } from "../../services/crud.service";

export const createCrudControllers = (modelName: PrismaModelName) => {
  const service = createCrudService(modelName);

  const getAll = async (req: Request, res: Response) => {
    const data = await service.getAll(req.userId, req.query);
    res.json({ [`${modelName}s`]: data });
  };

  const getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await service.getById(id, req.userId);
    res.json({ [modelName]: data });
  };

  const create = async (req: Request, res: Response) => {
    const created = await service.create(req.body, req.userId);
    res.status(201).json({ [modelName]: created });
  };

  const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = await service.update(id, req.body, req.userId);
    res.json({ [modelName]: updated });
  };

  const remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const removed = await service.remove(id, req.userId);
    res.json({ [modelName]: removed });
  };

  return { getAll, getById, create, update, remove };
};
