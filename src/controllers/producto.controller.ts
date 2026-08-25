import express, { type Request, type Response } from "express";
import pool from "../config/db.js";
import errorHandlerUtil from "../utils/errorHandlerUtil.js";

export const getProductosAll = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM producto');
        if (result.rowCount === 0) {
            console.log('No hay productos disponibles, por el momento.');
            return res.status(200).json({ message: 'No hay productos disponibles' });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        if (error instanceof Error) {
            const esErrorQuery = errorHandlerUtil(error);
            // Error en la consulta: dato, sintaxis, etc
            if (esErrorQuery) {
                res.status(500).json({ error: 'Error interno del Servidor' });
            } else {
                // Error de conexion a la base de datos
                res.status(503).json({ error: 'Servicio temporalmente no disponible' });
            }
        }
        res.status(500).json({ error: 'Error desconocido en el servidor' });
        throw error;
    }
}