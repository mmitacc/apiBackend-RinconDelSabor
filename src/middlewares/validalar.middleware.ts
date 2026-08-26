import type { Request, Response, NextFunction } from "express";


export const validarId = ((req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
            return res.status(400).json({ error: `El id = ${req.params.id}, debe ser un numero entero positivo mayor a cero.` })
        }
        return next();
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});

export const validarErrorPath = ((req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.path !== '/') {
            return res.status(400).json({ error: 'Error en ruta, no se permiten subrutas para este endpoint.' })
        }
        return next();
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});

export const validarFormatoEmail = ((req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        if (email !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'El campo <email>, debe tener un formato correcto.' })
            }
        }
        return next();
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});
