import { z } from "zod/v4";
import type { Request, Response } from "express";
import errorHandlerUtil from "../utils/errorHandlerUtil.js";
import { PedidoModel } from "../models/pedido.model.js";
import { ClienteModel } from "../models/cliente.model.js";
import { ProductoModel } from "../models/producto.model.js";

export const getPedidos = async (req: Request, res: Response) => {
  try {
    const result = await PedidoModel.getAllPedidos();
    if (result.length === 0) {
      console.log("No hay pedidos disponibles, por el momento.");
      return res
        .status(404)
        .json({ message: "No hay pedidos disponibles en al BD." });
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

export const getPedidosId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as any as number;
    const result = await PedidoModel.getPedidoById(id);
    if (result === null) {
      return res.status(404).json({ error: "Pedido no encontrado en la BD." });
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

export const getPedidosId_cliente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as any as number;
    const result = await PedidoModel.getPedidoById_cliente(id);
    if (result.length === 0) {
      console.log("No hay pedidos para ese cliente, por el momento.");
      return res.status(404).json({
        message: "No hay pedidos disponibles para el cliente en al BD.",
      });
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

export const createPedido = async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id_cliente);
    const existeId_cliente = await ClienteModel.getClienteById(id);
    if (!existeId_cliente) {
      console.log(`id_cliente no existe en "cliente" de la BD.`);
      return res.status(404).json({
        error:
          "No se puede crear el pedido, cliente no existe en  <cliente> de la BD",
      });
    }
    const result = await PedidoModel.insertPedido(req.body);
    if (!result) {
      console.log(`No se pudo registrar el nuevo pedido.`);
      return res
        .status(404)
        .json({ message: "No se pudo registrar el nuevo pedido." });
    }
    res.status(201).json({ "Registro de nuevo pedido, exitoso": result });
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

export const createPedidoAndDetalles = async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id_cliente);
    const existeId_cliente = await ClienteModel.getClienteById(id);
    if (!existeId_cliente) {
      console.log(`id_cliente no existe en "cliente" de la BD.`);
      return res.status(404).json({
        error:
          "No se puede crear el pedido, cliente no existe en  <cliente> de la BD",
      });
    }
    const itemsDP = req.body.items;
    for (const dp of itemsDP) {
      const idProductoItem = await ProductoModel.getProductoById(
        Number(dp.id_producto),
      );
      if (idProductoItem === null) {
        return res.status(404).json({
          error: `Producto con id=${dp.id_producto}, no existe en la BD`,
        });
      }
    }
    const result = await PedidoModel.insertPedidoExtendt(req.body);
    if (!result || result.length === 0) {
      console.log(`No se pudo registrar el nuevo pedido y/o detalles.`);
      return res.status(404).json({
        message: "No se pudo registrar el nuevo pedido y/o detalles.",
      });
    }
    return res
      .status(201)
      .json({ "Registro de nuevo pedido, exitoso": result });
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
  }
};

export const updatePedidoId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as any as number;
    const result = await PedidoModel.updatePedido(id, req.body);
    if (!result) {
      return res.status(404).json({ error: "Pedido no encontrado en la BD." });
    }
    res.status(200).json({ "Pedido actualizado, exitosamente": result });
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

export const delPedido = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as any as number;
    const detallePedido_idPPedido =
      await PedidoModel.getAllDetallePedido_idPedido(id);
    if (detallePedido_idPPedido.length !== 0) {
      console.log(
        `Pedido esta indexado con registros de "detalle_pedido" en la BD.`,
      );
      return res.status(404).json({
        "No se puede eliminar, hay registros en <detalle_pedido>":
          detallePedido_idPPedido,
      });
    }
    const result = await PedidoModel.deletePedido(id);
    if (result === null) {
      return res.status(404).json({ error: "Pedido no encontrado en la BD." });
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
