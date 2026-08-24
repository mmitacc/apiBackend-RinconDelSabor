import express, { type Request, type Response } from "express";
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors";
import pool from "./config/db.js";

const port = process.env.PORT;

const app = express();

// Middlewares 
app.use(cors())
app.use(express.json());

app.use("/api/docs", swaggerRouter);


app.get("/", (req: Request, res: Response) => {
    /*#swagger.tags = ['Tests']*/
    res.json({
        status: "Server online",
        version: "1.0.0"
    });
});

app.get('/api/menu', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM producto');
        if (result.rowCount === 0) {
            console.log('No hay productos disponibles, por el momento.');
            return res.status(200).json({ message: 'No hay productos disponibles' });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        console.error('[ERROR/datos]', msgError);
        res.status(500).json({ error: 'Error interno del Servidor' });
    }
})

app.listen(port, async () => {
    console.log(`URL: http://localhost:${port}`);
    try {
        const result = await pool.query('SELECT NOW()');
        console.log(`Conexión exitosa a Postgresql (Hora Server: ${result.rows[0].now})`);

    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        console.error('[ERROR/datos]', msgError);
    }
});