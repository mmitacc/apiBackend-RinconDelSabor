import { log } from "node:console";
import pool from "../config/db.js";
import type { DetallePedido } from "./detallePedido.model.js";

// Tipado de datos para 'producto'
export interface Producto {
    id_producto: number;
    nombre: string;
    precio: number;
    descripcion: string;
};

export type ProductoTypeCreate = Omit<Producto, 'id'>;

export type ProductoTypeUpdate = Partial<ProductoTypeCreate>;

// Consultas a la BD solo por 'ProductoModel'
export const ProductoModel = {
    getAllProductos: async (): Promise<Producto[]> => {
        const { rows } = await pool.query('SELECT * FROM producto');
        return rows;
    },
    getProductoById: async (id: number): Promise<Producto | null> => {
        const { rows } = await pool.query('SELECT * FROM producto WHERE id_producto = $1', [id]);
        return rows[0] || null;
    },
    insertProducto: async (dato: ProductoTypeCreate): Promise<Producto> => {
        const { nombre, precio, descripcion } = dato;
        const query =
            'INSERT INTO producto (nombre , precio , descripcion) VALUES ($1,$2,$3) RETURNING *';
        const { rows } = await pool.query(query, [nombre, precio, descripcion]);
        return rows[0];
    },
    updateProducto: async (id: number, dato: ProductoTypeUpdate): Promise<Producto | null> => {
        const campos = Object.keys(dato); // capturamos los campos
        if (campos.length === 0) {
            throw new Error('No hay campos para actualizar!');
        }
        // Gemeramos las clausulas solo de los campos recibidos
        const setClausula: string[] = [];
        const setValues: (string | number | boolean | null)[] = [];
        campos.forEach((key, index) => {
            setClausula.push(`${key} = $${index + 1}`);
            const secureKey = key as keyof ProductoTypeUpdate;
            setValues.push(dato[secureKey] ?? null);
        });
        // Y agregamos al final el id_libro
        setValues.push(id);

        // Ahora armamos el query completo para 'pool'
        const query = `
        UPDATE producto
        SET ${setClausula.join(', ')}
        WHERE id_producto = $${setValues.length}
        RETURNING *;
        `;

        // Hacemos la consulta
        const result = await pool.query(query, setValues);
        return result.rows[0] || null;
    },
    deleteProducto: async (id: number): Promise<Producto | null> => {
        const { rows } = await pool.query("DELETE FROM producto WHERE id_producto = $1 RETURNING *;", [id]);
        return rows[0] || null;
    },
    getAllDetallePedido_idProducto: async (id: number): Promise<DetallePedido[]> => {
        const result = await pool.query("SELECT * FROM detalle_pedido WHERE id_producto = $1;", [id]);
        return result.rows;
    }
};



