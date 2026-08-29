import { z } from "zod/v4";

export const productoBodySchema = z.object({
  nombre: z
    .string({ message: "El nombre debe ser un texto" })
    .trim()
    .min(1, "El nombre es obligatorio")
    .min(3, "El nombre debe tener mínimo 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  precio: z
    .number({ message: "El precio es obligatorio y debe ser un número válido" })
    .nonnegative("El precio no puede ser menor a cero"),
  descripcion: z
    .string({ message: "La descripcion debe ser un texto" })
    .trim()
    .min(1, "La descripcion es obligatoria")
    .min(5, "La descripcion debe tener mínimo 5 caracteres")
    .max(200, "La descripcion no puede superar los 200 caracteres"),
});

export const productoPutSchema = productoBodySchema.partial().refine(
  (data) => {
    const camposEnviados = Object.values(data).filter((val) => {
      return val !== undefined;
    });
    return camposEnviados.length > 0;
  },
  { message: "Se debe ingresar al menos un campo para actualizar.", path: [] },
);
