// Tipado de datos para 'detalle-pedido'
export interface Pedido {
  id_pedido: number;
  fecha: Date;
  id_cliente: number;
}

export type PedidoTypeCreate = Omit<Pedido, "id">;

export type PedidoTypeUpdate = Partial<PedidoTypeCreate>;
