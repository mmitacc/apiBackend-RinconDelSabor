import errorMessageServer from "./error.message.js";

const errorHandlerUtil = (error: unknown): boolean => {
    const msgError = error as any;
    const codigo = msgError?.code || 'UNKNOWN';
    // Error en la consulta: dato, sintaxis, etc
    const esErrorQuery = /^[0-9A-Z]{5}$/.test(String(codigo));
    if (esErrorQuery) {
        console.error(`[QUERY ERROR] code=${codigo} detail=${errorMessageServer(codigo)}`);
    } else {
        // Error de conexion a la base de datos
        console.error(`[DB ERROR] code=${codigo} detail=${errorMessageServer(codigo)}`);
    }
    return esErrorQuery
};

export default errorHandlerUtil;