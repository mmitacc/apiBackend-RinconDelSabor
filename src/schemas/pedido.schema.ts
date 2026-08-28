import { z } from "zod/v4";

const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

export const pedidoBodySchema = z.object({
  fecha: z
    .string()
    .regex(isoDateTimeRegex, {
      message:
        "La fecha debe ser un formato ISO 8601 válido (Ej: 2026-08-27T20:15:00.000Z)",
    })
    .optional(),
  id_cliente: z
    .number({
      message: "El id_cliente es obligatorio y debe ser un número válido",
    })
    .nonnegative("El id_cliente no puede ser menor a cero")
    .int("El id_cliente debe ser un número entero"),
  estado: z
    .string({ message: "El estado debe ser un texto" })
    .trim()
    .min(5, "El estado debe tener mínimo 5 caracteres")
    .max(15, "El estado no puede superar los 15 caracteres")
    .optional(),
});

export const pedidoPutSchema = pedidoBodySchema.partial().refine(
  (data) => {
    const camposEnviados = Object.values(data).filter((val) => {
      return val !== undefined;
    });
    return camposEnviados.length > 0;
  },
  { message: "Se debe ingresar al menos un campo para actualizar.", path: [] },
);
