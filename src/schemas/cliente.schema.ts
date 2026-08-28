import { z } from "zod/v4";

export const clienteBodySchema = z.object({
  nombre: z
    .string({ message: "El nombre debe ser un texto" })
    .trim()
    .min(1, "El nombre es obligatorio")
    .min(3, "El nombre debe tener mínimo 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  email: z
    .string({ message: "El email debe ser un texto" })
    .trim()
    .pipe(
      z
        .email("El formato de email no es válido")
        .min(5, "El email debe tener mínimo 5 caracteres")
        .max(150, "El email no puede superar los 150 caracteres"),
    ),
  telefono: z
    .string({ message: "El telefono debe ser un texto" })
    .trim()
    .min(1, "El telefono es obligatorio")
    .min(9, "El telefono debe tener mínimo 9 caracteres")
    .max(20, "El telefono no puede superar los 20 caracteres"),
});

export const clientePutSchema = clienteBodySchema.partial().refine(
  (data) => {
    const camposEnviados = Object.values(data).filter((val) => {
      return val !== undefined;
    });
    return camposEnviados.length > 0;
  },
  { message: "Se debe ingresar al menos un campo para actualizar.", path: [] },
);
