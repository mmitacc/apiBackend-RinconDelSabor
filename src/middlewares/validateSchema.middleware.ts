import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod/v4";
import { z } from "zod/v4";
import errorHandlerUtil from "../utils/errorHandlerUtil.js";

export const validateBodySchema = (schema: ZodObject<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await schema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({
          status: "error",
          error: z.treeifyError(result.error),
        });
        return;
      }
      req.body = result.data;
      next();
    } catch (error) {
      if (error instanceof Error) {
        const esErrorQuery = errorHandlerUtil(error);
        // Error en la consulta: dato, sintaxis, etc
        if (esErrorQuery) {
          res.status(500).json({ error: "Error interno del Servidor" });
          return;
        } else {
          // Error de conexion a la base de datos
          res
            .status(503)
            .json({ error: "Servicio temporalmente no disponible" });
          return;
        }
      }
      res.status(500).json({ error: "Error desconocido en el servidor" });
      throw error;
    }
  };
};

export const validateParamsSchema = (schema: ZodObject<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await schema.safeParse(req.params);
      if (!result.success) {
        res.status(400).json({
          status: "error",
          error: z.treeifyError(result.error),
        });
        return;
      }
      req.params = result.data as any;
      next();
    } catch (error) {
      if (error instanceof Error) {
        const esErrorQuery = errorHandlerUtil(error);
        // Error en la consulta: dato, sintaxis, etc
        if (esErrorQuery) {
          res.status(500).json({ error: "Error interno del Servidor" });
          return;
        } else {
          // Error de conexion a la base de datos
          res
            .status(503)
            .json({ error: "Servicio temporalmente no disponible" });
          return;
        }
      }
      res.status(500).json({ error: "Error desconocido en el servidor" });
      throw error;
    }
  };
};
