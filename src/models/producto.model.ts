import pool from "../config/db.js";
import type { DetallePedido } from "./detallePedido.model.js";
import { tablasDB } from "./global.model.js";
import type { PaginationResults } from "./global.model.js";

// Tipado de datos para 'producto'
export interface Producto {
  id_producto: number;
  nombre: string;
  precio: number;
  descripcion: string;
}
// Tipado de datos para un nuevo 'producto'
export type ProductoTypeCreate = Omit<Producto, "id">;
// Tipado de datos para actualizar un 'producto'
export type ProductoTypeUpdate = Partial<ProductoTypeCreate>;
// Tipado de datos para una consulta Query por endpoint en 'producto'
export interface QueryParamsProducto {
  page?: string;
  limit?: string;
  search?: string;
  minPrecio?: string;
  maxPrecio?: string;
}

// Consultas a la BD solo por 'ProductoModel'
export const ProductoModel = {
  findWithFilter: async (
    page: number = 1,
    limit: number = 10,
    search?: string,
    minPrecio?: number,
    maxPrecio?: number,
  ): Promise<PaginationResults<Producto>> => {
    const conditions: string[] = [];
    const values: unknown[] = [];
    let paramsIndex = 1;
    // Construcción de las 'condiciones'
    if (search) {
      conditions.push(`nombre ILIKE $${paramsIndex}`);
      values.push(`%${search}%`);
      paramsIndex++;
    }
    if (minPrecio !== undefined) {
      conditions.push(`precio >= $${paramsIndex}`);
      values.push(minPrecio);
      paramsIndex++;
    }
    if (maxPrecio !== undefined) {
      conditions.push(`precio <= $${paramsIndex}`);
      values.push(maxPrecio);
      paramsIndex++;
    }
    // Unir las condiciones con AND
    const whereUnited =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    // Conteo total de los elementos que coinciden con los filtros solicitados
    const countQuery = `SELECT COUNT(*) FROM producto ${whereUnited}`;
    const countResult = await pool.query(countQuery, values);
    const total = Number(countResult.rows[0].count);
    // Consulta de datos con LIMIT y OFFSET
    const offset = (page - 1) * limit;
    // Agregar el LIMIT y OFFSET a los placeholders dinamicos
    const dataValues = [...values, limit, offset];
    const dataQuery = `
    SELECT * FROM producto
    ${whereUnited}
    ORDER BY id_producto ASC
    LIMIT $${paramsIndex} OFFSET $${paramsIndex + 1}
    `;
    const { rows } = await pool.query(dataQuery, dataValues);
    return {
      data: rows,
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit) || 1,
    };
  },
  // getAllProductos: async (): Promise<Producto[]> => {
  //   const { rows } = await pool.query("SELECT * FROM producto");
  //   return rows;
  // },
  getProductoById: async (id: number): Promise<Producto | null> => {
    const { rows } = await pool.query(
      "SELECT * FROM producto WHERE id_producto = $1",
      [id],
    );
    return rows[0] || null;
  },
  insertProducto: async (dato: ProductoTypeCreate): Promise<Producto> => {
    const { nombre, precio, descripcion } = dato;
    const query =
      "INSERT INTO producto (nombre , precio , descripcion) VALUES ($1,$2,$3) RETURNING *";
    const { rows } = await pool.query(query, [nombre, precio, descripcion]);
    return rows[0];
  },
  updateProducto: async (
    id: number,
    dato: ProductoTypeUpdate,
  ): Promise<Producto | null> => {
    const campos = Object.keys(dato); // capturamos los campos que se estan actualizando
    // Limpiamos los campos de posibles scripts malisiosos
    const camposProducto: string[] = tablasDB["producto"] ?? [];
    // const camposProducto = ["nombre", "precio", "descripcion"];
    const camposLimpios = campos.filter((c) => camposProducto.includes(c));
    // Evaluamos si existen campos ingresados para filtrar
    if (camposLimpios.length === 0) {
      throw new Error("No hay campos para actualizar!");
    }
    // Gemeramos las clausulas solo de los campos recibidos
    const setClausula: string[] = [];
    const setValues: unknown[] = [];
    camposLimpios.forEach((key, index) => {
      setClausula.push(`${key} = $${index + 1}`);
      const secureKey = key as keyof ProductoTypeUpdate;
      setValues.push(dato[secureKey] ?? null);
    });
    // Y agregamos al final el id_libro
    setValues.push(id);
    // Ahora armamos el query completo para 'pool'
    const query = `
        UPDATE producto
        SET ${setClausula.join(", ")}
        WHERE id_producto = $${setValues.length}
        RETURNING *;
        `;
    // Hacemos la consulta
    const result = await pool.query(query, setValues);
    return result.rows[0] || null;
  },
  deleteProducto: async (id: number): Promise<Producto | null> => {
    const { rows } = await pool.query(
      "DELETE FROM producto WHERE id_producto = $1 RETURNING *;",
      [id],
    );
    return rows[0] || null;
  },
  getAllDetallePedido_idProducto: async (
    id: number,
  ): Promise<DetallePedido[]> => {
    const result = await pool.query(
      "SELECT * FROM detalle_pedido WHERE id_producto = $1;",
      [id],
    );
    return result.rows;
  },
};
