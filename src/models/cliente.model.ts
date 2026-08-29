import pool from "../config/db.js";
import { tablasDB } from "./global.model.js";
import type { Pedido } from "./pedido.model.js";

// Tipado de datos para 'cliente'
export interface Cliente {
  id_cliente: number;
  nombre: string;
  email: string;
  telefono: string;
}

export type ClienteTypeCreate = Omit<Cliente, "id">;

export type ClienteTypeUpdate = Partial<ClienteTypeCreate>;

// Consultas a la BD solo por 'ClienteModel'
export const ClienteModel = {
  getAllCliente: async (): Promise<Cliente[]> => {
    const { rows } = await pool.query("SELECT * FROM cliente");
    return rows;
  },
  getClienteById: async (id: number): Promise<Cliente | null> => {
    const { rows } = await pool.query(
      "SELECT * FROM cliente WHERE id_cliente = $1",
      [id],
    );
    return rows[0] || null;
  },
  insertCliente: async (dato: ClienteTypeCreate): Promise<Cliente> => {
    const { nombre, email, telefono } = dato;
    const query =
      "INSERT INTO cliente (nombre , email , telefono) VALUES ($1,$2,$3) RETURNING *";
    const { rows } = await pool.query(query, [nombre, email, telefono]);
    return rows[0];
  },
  updateCliente: async (
    id: number,
    dato: ClienteTypeUpdate,
  ): Promise<Cliente | null> => {
    const campos = Object.keys(dato); // capturamos los campos que se estan actualizando
    // Limpiamos los campos de posibles scripts malisiosos
    const camposCliente: string[] = tablasDB["cliente"] ?? [];
    // const camposProducto = ["nombre", "precio", "descripcion"];
    const camposLimpios = campos.filter((c) => camposCliente.includes(c));
    // Evaluamos si existen campos ingresados para filtrar
    if (camposLimpios.length === 0) {
      throw new Error("No hay campos para actualizar!");
    }
    // Gemeramos las clausulas solo de los campos recibidos
    const setClausula: string[] = [];
    const setValues: unknown[] = [];
    camposLimpios.forEach((key, index) => {
      setClausula.push(`${key} = $${index + 1}`);
      const secureKey = key as keyof ClienteTypeUpdate;
      setValues.push(dato[secureKey] ?? null);
    });
    // Y agregamos al final el id_cliente
    setValues.push(id);
    // Ahora armamos el query completo para 'pool'
    const query = `
        UPDATE cliente
        SET ${setClausula.join(", ")}
        WHERE id_cliente = $${setValues.length}
        RETURNING *;
        `;
    // Hacemos la consulta
    const result = await pool.query(query, setValues);
    return result.rows[0] || null;
  },
  deleteCliente: async (id: number): Promise<Cliente | null> => {
    const { rows } = await pool.query(
      "DELETE FROM cliente WHERE id_cliente = $1 RETURNING *;",
      [id],
    );
    return rows[0] || null;
  },
  getAllPedido_idCliente: async (id: number): Promise<Pedido[]> => {
    const result = await pool.query(
      "SELECT * FROM pedido WHERE id_cliente = $1;",
      [id],
    );
    return result.rows;
  },
};
