import { z } from "zod/v4";

export const detallePedidoBodySchema = z.object({
  id_producto: z
    .number({
      message: "El id_producto es obligatorio y debe ser un número válido",
    })
    .nonnegative("El id_producto no puede ser menor a cero")
    .int("El id_producto debe ser un número entero"),
  cantidad: z
    .number({
      message: "La cantidad es obligatorio y debe ser un número válido",
    })
    .nonnegative("La cantidad no puede ser menor a cero")
    .int("La cantidad debe ser un número entero"),
  precio_unid: z
    .number({
      message: "La cantidad es obligatorio y debe ser un número válido",
    })
    .nonnegative("La cantidad no puede ser menor a cero"),
});
