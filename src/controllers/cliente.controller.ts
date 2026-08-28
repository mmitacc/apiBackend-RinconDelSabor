import type { Request, Response } from "express";
import errorHandlerUtil from "../utils/errorHandlerUtil.js";
import { ClienteModel } from "../models/cliente.model.js";

export const getCliente = async (req: Request, res: Response) => {
  try {
    const result = await ClienteModel.getAllCliente();
    if (result.length === 0) {
      console.log("No hay clientes disponibles, por el momento.");
      return res
        .status(404)
        .json({ message: "No hay clientes disponibles en al BD." });
    }
    res.status(200).json({ all: result.length, data: result });
  } catch (error) {
    if (error instanceof Error) {
      const esErrorQuery = errorHandlerUtil(error);
      // Error en la consulta: dato, sintaxis, etc
      if (esErrorQuery) {
        return res.status(500).json({ error: "Error interno del Servidor" });
      } else {
        // Error de conexion a la base de datos
        return res
          .status(503)
          .json({ error: "Servicio temporalmente no disponible" });
      }
    }
    res.status(500).json({ error: "Error desconocido en el servidor" });
    throw error;
  }
};

export const getClienteId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as any as number;
    const result = await ClienteModel.getClienteById(id);
    if (result === null) {
      return res.status(404).json({ error: "Cliente no encontrado en la BD." });
    }
    res.status(200).json({ "Busqueda exitosa": result });
  } catch (error) {
    if (error instanceof Error) {
      const esErrorQuery = errorHandlerUtil(error);
      // Error en la consulta: dato, sintaxis, etc
      if (esErrorQuery) {
        return res.status(500).json({ error: "Error interno del Servidor" });
      } else {
        // Error de conexion a la base de datos
        return res
          .status(503)
          .json({ error: "Servicio temporalmente no disponible" });
      }
    }
    res.status(500).json({ error: "Error desconocido en el servidor" });
    throw error;
  }
};

export const createCliente = async (req: Request, res: Response) => {
  try {
    const result = await ClienteModel.insertCliente(req.body);
    if (!result) {
      console.log(`No se pudo registrar el nuevo cliente.`);
      return res
        .status(404)
        .json({ message: "No se pudo registrar el nuevo cliente." });
    }
    res.status(201).json({ "Registro de nuevo cliente, exitoso": result });
  } catch (error) {
    if (error instanceof Error) {
      const esErrorQuery = errorHandlerUtil(error);
      // Error en la consulta: dato, sintaxis, etc
      if (esErrorQuery) {
        return res.status(500).json({ error: "Error interno del Servidor" });
      } else {
        // Error de conexion a la base de datos
        return res
          .status(503)
          .json({ error: "Servicio temporalmente no disponible" });
      }
    }
    res.status(500).json({ error: "Error desconocido en el servidor" });
    throw error;
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as any as number;
    const result = await ClienteModel.updateCliente(id, req.body);
    if (!result) {
      return res.status(404).json({ error: "Cliente no encontrado en la BD." });
    }
    res.status(200).json({ "Cliente actualizado, exitosamente": result });
  } catch (error) {
    if (error instanceof Error) {
      const esErrorQuery = errorHandlerUtil(error);
      // Error en la consulta: dato, sintaxis, etc
      if (esErrorQuery) {
        return res.status(500).json({ error: "Error interno del Servidor" });
      } else {
        // Error de conexion a la base de datos
        return res
          .status(503)
          .json({ error: "Servicio temporalmente no disponible" });
      }
    }
    res.status(500).json({ error: "Error desconocido en el servidor" });
    throw error;
  }
};

export const delCliente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as any as number;
    const pedido_idCliente = await ClienteModel.getAllPedido_idCliente(id);
    if (pedido_idCliente.length !== 0) {
      console.log(
        `Cliente esta indexado con registros de "pedido" en la BD.`,
      );
      return res.status(404).json({
        "No se puede eliminar, hay registros en <pedido>": pedido_idCliente,
      });
    }
    const result = await ClienteModel.deleteCliente(id);
    if (result === null) {
      return res.status(404).json({ error: "Cliente no encontrado en la BD." });
    }
    res.status(200).json({ "Eliminación exitosa": result });
  } catch (error) {
    if (error instanceof Error) {
      const esErrorQuery = errorHandlerUtil(error);
      // Error en la consulta: dato, sintaxis, etc
      if (esErrorQuery) {
        return res.status(500).json({ error: "Error interno del Servidor" });
      } else {
        // Error de conexion a la base de datos
        return res
          .status(503)
          .json({ error: "Servicio temporalmente no disponible" });
      }
    }
    res.status(500).json({ error: "Error desconocido en el servidor" });
    throw error;
  }
};
