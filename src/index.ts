import express, { type Request, type Response } from "express";
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors";
import pool from "./config/db.js";
import productoRouter from "./routes/producto.router.js";
import clienteRouter from "./routes/cliente.router.js";
import pedidoRouter from "./routes/pedido.router.js";
import { initLoadTablesFieldsOfDB } from "./models/global.model.js";

const port = process.env.PORT;

const app = express();

// Middlewar para autorización de conexión en la web con servidor
app.use(cors());

// Middlewar de validación de entradas Json
app.use(express.json());

// Middleware para documentación con Swagger
app.use("/api/docs", swaggerRouter);

// Endpoint para testeo de servidor backend
app.get("/", (req: Request, res: Response) => {
  /*#swagger.tags = ['Tests']*/
  res.json({
    status: "Server online",
    version: "1.0.0",
  });
});

// Endpoints para 'producto'
app.use("/api/menu", productoRouter);
// Endpoints para 'cliente'
app.use("/api/cliente", clienteRouter);
// Endpoints para 'pedido'
app.use("/api/pedido", pedidoRouter);

console.clear();
// Inicialización del servidor
const server = app.listen(port, async () => {
  console.log(`URL: http://localhost:${port}`);
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(
      `Conexión exitosa a Postgresql (Hora Server: ${result.rows[0].now})`,
    );
    // Cargamos un objeto con nombres de tablas y sus correspondientes campos de la BD
    await initLoadTablesFieldsOfDB;
  } catch (error) {
    const msgError =
      error instanceof Error ? error.message : "Error interno desconocido";
    console.error("[ERROR/datos]", msgError);
  }
});

// Cierre correcto del servidor, para evitar conexiones colgadas
const shutdown = async (signal: string) => {
  console.log(`\n[${signal}] Cerrando servidor...`);
  server.close(async () => {
    console.log("[HTTP] Conexiones HTTP cerradas");
    await pool.end();
    console.log("[DB] Pool cerrado correctamente");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
