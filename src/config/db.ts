import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 10,                        // máximo de conexiones simultáneas
    idleTimeoutMillis: 30000,       // cierra conexiones inactivas después de 30s
    connectionTimeoutMillis: 5000   // falla si no conecta en 5s
});

export default pool;
