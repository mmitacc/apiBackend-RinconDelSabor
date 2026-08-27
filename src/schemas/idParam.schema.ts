import { z } from "zod/v4";

const idParamSchema = z.object({
  id: z.coerce
    .number({ message: "El ID debe ser un número válido" })
    .int("El ID debe ser un número entero")
    .nonnegative("El ID no puede ser menor a cero"),
});

export default idParamSchema;
