import { time } from "node:console";
import pool from "../config/db.js";
import type {
  DetallePedido,
  DetallePedidoTypeCreate,
} from "./detallePedido.model.js";
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

// ==Insertar nuevo pedido extendido ==
type DetallePedidoNewPedido = Omit<DetallePedidoTypeCreate, "id_pedido">;
export interface PedidoCreateExtend {
  id_cliente: number;
  items: DetallePedidoNewPedido[];
}

// Consultas a la BD solo por 'PedidosModel'
export const PedidoModel = {
  getAllPedidos: async (): Promise<Pedido[]> => {
    const { rows } = await pool.query(`
SELECT id_pedido, fecha, estado, pedido.id_cliente, nombre  FROM pedido
INNER JOIN cliente ON pedido.id_cliente = cliente.id_cliente`);
    return rows;
  },
  getPedidoById: async (id: number): Promise<Pedido | null> => {
    const { rows } = await pool.query(
      `
SELECT id_pedido, fecha, estado, pedido.id_cliente, nombre  FROM pedido
INNER JOIN cliente ON pedido.id_cliente = cliente.id_cliente
WHERE id_pedido = $1
      `,
      [id],
    );
    return rows[0] || null;
  },
  getPedidoById_cliente: async (id: number): Promise<Pedido[]> => {
    const { rows } = await pool.query(
      `
SELECT id_pedido, fecha, estado, pedido.id_cliente, nombre  FROM pedido
INNER JOIN cliente ON pedido.id_cliente = cliente.id_cliente
WHERE pedido.id_cliente = $1
      `,
      [id],
    );
    return rows;
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
  insertPedidoExtendt: async (
    datoExtendt: PedidoCreateExtend,
  ): Promise<DetallePedido[]> => {
    // Creando una conexion dedicada
    const dedicadaPool = await pool.connect();
    try {
      // Iniciado la conexion dedicada
      await dedicadaPool.query("BEGIN");
      // Consultas resguardadas por la conexión dedicada
      const { id_cliente, items } = datoExtendt;
      const queryPedido =
        "INSERT INTO pedido (id_cliente) VALUES ($1) RETURNING *";
      const { rows } = await dedicadaPool.query(queryPedido, [id_cliente]);
      const idNewPedido = rows[0].id_pedido;
      let values: number[] = [];
      const elements: string[] = [];
      items.forEach((item, index) => {
        const n = 4 * index;
        values = values.concat([
          item.id_producto,
          item.cantidad,
          item.precio_unid,
          idNewPedido,
        ]);
        elements.push(`($${n + 1}, $${n + 2}, $${n + 3}, $${n + 4})`);
      });
      const insertUnited =
        elements.length > 0 ? `VALUES ${elements.join(", ")}` : "";
      const queryDetallePedidos = `INSERT INTO detalle_pedido (id_producto, cantidad, precio_unid, id_pedido) ${insertUnited} RETURNING *`;
      const result = await dedicadaPool.query(queryDetallePedidos, values);
      return result.rows as DetallePedido[];
    } catch (error) {
      // Eliminando todas las transacciones en la conexion dedicada
      await dedicadaPool.query("ROLLBACK");
      console.error(
        "Error en el registro de Pedido Extendido, se aplico ROLLBACK",
        error,
      );
      throw error;
    } finally {
      // Cerrando la conexion dedicada
      dedicadaPool.release();
    }
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
