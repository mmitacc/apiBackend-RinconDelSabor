
// Tipado de datos para 'detalle-pedido'
export interface DetallePedido {
    id_dpedido: number;
    cantidad: number;
    precio_unid: number;
    id_pedido: number;
    id_producto: number;
};


export type DetallePedidoTypeCreate = Omit<DetallePedido, 'id_dpedido'>;

export type DetallePedidoTypeUpdate = Partial<DetallePedidoTypeCreate>;

