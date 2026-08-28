import pool from "../config/db.js";
import type { DetallePedido } from "./detallePedido.model.js";
import { tablasDB } from "./global.model.js";

// Tipado de datos para 'detalle-pedido'
export interface Pedido {
  id_pedido: number;
  fecha?: string;
  id_cliente: number;
  estado?: string;
}

export type PedidoTypeCreate = Omit<Pedido, "id_pedido">;

export type PedidoTypeUpdate = Partial<PedidoTypeCreate>;

// Consultas a la BD solo por 'PedidosModel'
export const PedidoModel = {
  getAllPedidos: async (): Promise<Pedido[]> => {
    const { rows } = await pool.query("SELECT * FROM pedido");
    return rows;
  },
  getPedidoById: async (id: number): Promise<Pedido | null> => {
    const { rows } = await pool.query(
      "SELECT * FROM pedido WHERE id_pedido = $1",
      [id],
    );
    return rows[0] || null;
  },
  insertPedido: async (dato: PedidoTypeCreate): Promise<Pedido> => {
    const { fecha, id_cliente, estado } = dato;
    const newfecha = fecha ?? new Date().toISOString();
    const newEstado = estado ?? "Pending";
    const query =
      "INSERT INTO pedido (fecha , id_cliente, estado) VALUES ($1,$2,$3) RETURNING *";
    const { rows } = await pool.query(query, [newfecha, id_cliente, newEstado]);
    return rows[0];
  },
  updatePedido: async (
    id: number,
    dato: PedidoTypeUpdate,
  ): Promise<Pedido | null> => {
    const campos = Object.keys(dato); // capturamos los campos que se estan actualizando
    // Limpiamos los campos de posibles scripts malisiosos
    const camposPedido: string[] = tablasDB["pedido"] ?? [];
    // const camposProducto = ["nombre", "precio", "descripcion"];
    const camposLimpios = campos.filter((c) => camposPedido.includes(c));
    // Evaluamos si existen campos ingresados para filtrar
    if (camposLimpios.length === 0) {
      throw new Error("No hay campos para actualizar!");
    }
    // Gemeramos las clausulas solo de los campos recibidos
    const setClausula: string[] = [];
    const setValues: unknown[] = [];
    camposLimpios.forEach((key, index) => {
      setClausula.push(`${key} = $${index + 1}`);
      const secureKey = key as keyof PedidoTypeUpdate;
      setValues.push(dato[secureKey] ?? null);
    });
    // Y agregamos al final el id_pedido
    setValues.push(id);
    // Ahora armamos el query completo para 'pool'
    const query = `
        UPDATE pedido
        SET ${setClausula.join(", ")}
        WHERE id_pedido = $${setValues.length}
        RETURNING *;
        `;
    // Hacemos la consulta
    const result = await pool.query(query, setValues);
    return result.rows[0] || null;
  },
  deletePedido: async (id: number): Promise<Pedido | null> => {
    const { rows } = await pool.query(
      "DELETE FROM pedido WHERE id_producto = $1 RETURNING *;",
      [id],
    );
    return rows[0] || null;
  },
  getAllDetallePedido_idPedido: async (
    id: number,
  ): Promise<DetallePedido[]> => {
    const result = await pool.query(
      "SELECT * FROM detalle_pedido WHERE id_pedido = $1;",
      [id],
    );
    return result.rows;
  },
};
