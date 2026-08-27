import type { Request, Response } from "express";
import errorHandlerUtil from "../utils/errorHandlerUtil.js";
import { ProductoModel } from "../models/producto.model.js";

export const getMenu = async (req: Request, res: Response) => {
  try {
    const result = await ProductoModel.getAllProductos();
    if (result.length === 0) {
      console.log("No hay productos disponibles, por el momento.");
      return res
        .status(404)
        .json({ message: "No hay productos disponibles en al BD." });
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

export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as any as number;
    console.log('getProduct: ',id);
    
    const result = await ProductoModel.getProductoById(id);
    if (result === null) {
      console.log(`No hay productos con id = ${id}.`);
      return res
        .status(404)
        .json({ error: "Producto no encontrado en la BD." });
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

export const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductoModel.insertProducto(req.body);
    if (!result) {
      console.log(`No se pudo registrar el nuevo menu.`);
      return res
        .status(404)
        .json({ message: "No se pudo registrar el nuevo menu." });
    }
    res.status(201).json({ "Registro de nuevo menu, exitoso": result });
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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as any as number;
    // const { nombre, precio, descripcion } = req.body;
    // const fieldsClean: any = {};
    // if (nombre !== undefined) fieldsClean.nombre = nombre;
    // if (precio !== undefined) fieldsClean.precio = precio;
    // if (descripcion !== undefined) fieldsClean.descripcion = descripcion;
    // if (Object.keys(fieldsClean).length === 0) {
    //     console.log(`Se necesita al menos un dato del Producto Menu, para actualizar.`);
    //     return res.status(400).json({ error: "No hay datos para actualizar el Producto del Menu." });
    // }
    // const result = await ProductoModel.updateProducto(id, fieldsClean);
    const result = await ProductoModel.updateProducto(id, req.body);
    if (result === null) {
      console.log(`No hay productos con id = ${id}.`);
      return res
        .status(404)
        .json({ error: "Producto no encontrado en la BD." });
    }
    res.status(200).json({ "Producto actualizado, exitosamente": result });
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

export const delProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as any as number;
    const detallePedido_idProducto =
      await ProductoModel.getAllDetallePedido_idProducto(id);
    if (detallePedido_idProducto.length !== 0) {
      console.log(
        `Producto esta indexado con registros de otra tabla en la BD.`,
      );
      return res
        .status(404)
        .json({
          "No se puede eliminar, esta indexado a": detallePedido_idProducto,
        });
    }
    const result = await ProductoModel.deleteProducto(id);
    if (result === null) {
      console.log(`No hay productos con id = ${id}.`);
      return res
        .status(404)
        .json({ error: "Producto no encontrado en la BD." });
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
