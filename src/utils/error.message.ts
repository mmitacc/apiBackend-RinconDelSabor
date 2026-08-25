const errorMessageServer = ((codigoError: string) => {
    if (!codigoError) {
        return 'Error inesperado, fuera del motor de la base de datos.'
    }
    switch (codigoError) {
        // --- ERRORES DE SINTAXIS Y DATOS ---
        case '42601':
            return 'Error de sintaxis en la consulta SQL (Verifica comas, paréntesis o signos).';
        case '42703':
            return 'Columna inexistente: Una de las columnas especificadas no existe en la tabla.';
        case '42P01':
            return 'Tabla inexistente: La tabla consultada no existe en la base de datos.';
        case '22P02':
            return 'Formato de datos inválido (Ej: Intentar meter texto en una columna numérica o UUID).';
        // --- ERRORES DE RESTRICCIONES (INTEGRIDAD) ---
        case '23505':
            return 'Registro duplicado: Ya existe un dato con ese valor único  || Llave duplicada.';
        case '23503':
            return 'Violación de clave foránea: Estás intentando referenciar o eliminar un registro que está amarrado a otra tabla.';
        case '23502':
            return 'Violación de restricción NOT NULL: Te falta enviar un campo obligatorio.';
        case '23514':
            return 'Violación de restricción CHECK: Los datos enviados no cumplen con las reglas de validación de la tabla.';
        // --- ERRORES DE CONEXIÓN Y AUTENTICACIÓN ---
        case '28P01':
            return 'Autenticación fallida: El usuario o la contraseña de PostgreSQL son incorrectos.';
        case '3D000':
            return 'La base de datos especificada en la configuración no existe.';
        case '28000':
            return 'El rol o usuario de la base de datos especificado no existe.';
        case 'ECONNREFUSED':
            return 'Conexión rechazada: El servidor PostgreSQL está apagado o el puerto es incorrecto.';
        case 'ETIMEDOUT':
            return 'Tiempo de espera agotado: La base de datos tardó demasiado en responder.';
        // --- ERRORES DE RECURSOS / LÍMITES ---
        case '53300':
            return 'Demasiadas conexiones activas: El servidor de base de datos ha alcanzado su límite máximo.';
        case '57P01':
            return 'El servidor de la base de datos se está apagando o interrumpió la sesión de forma abrupta.';
        default:
            // Si no mapeamos el código, devolvemos el código genérico para poder rastrearlo
            return `Error de base de datos no clasificado (Código SQLSTATE: ${codigoError}).`;
    }
});

export default errorMessageServer;