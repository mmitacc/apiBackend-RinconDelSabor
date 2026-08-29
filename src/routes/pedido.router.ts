import { Router } from "express";
import {
  getPedidos,
  getPedidosId,
  createPedido,
  updatePedidoId,
  delPedido,
  getPedidosId_cliente,
} from "../controllers/pedido.controller.js";
import type { Request, Response, NextFunction } from "express";
import { validarErrorPath } from "../middlewares/validalar.middleware.js";
import {
  validateBodySchema,
  validateParamsSchema,
} from "../middlewares/validateSchema.middleware.js";
import idParamSchema from "../schemas/idParam.schema.js";
import { pedidoBodySchema, pedidoPutSchema } from "../schemas/pedido.schema.js";

const router: Router = Router();

// Traer todos los pedidos
router.get("/", (req: Request, res: Response) => {
  /*  
        #swagger.tags = ['Pedido']
        #swagger.summary = 'Obtener y filtrar todos los Pedidos'
        #swagger.description = 'Retorna la lista de pedidos incluido el nombre del cliente'
        #swagger.responses = {
            200: {
                description: 'Pedidos hallados satisfactoriamente.',
                schema: {
                    type: 'array',
                    items: { $ref: '#/definitions/Menu' }
                }
            },  
            404: {
                description: 'No hay pedidos en la BD',
                schema: { error: 'No hay pedidos en la BD' }
            },
            500: {
                description: 'Error interno del servidor.',
                schema: { error: 'Mensaje de error específico' }
            }
        }
    */
  getPedidos(req, res);
});

// Traer el pedido con ID
router.get(
  "/:id",
  validateParamsSchema(idParamSchema),
  (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Pedido']
    #swagger.summary = 'Obtener un Pedido por ID'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico del Pedido',
    required: true,
    type: 'integer'
    }
    #swagger.responses = {
        200: {
            description: 'Busqueda exitosa',
            schema: { id: 1, fecha: '2026-08-27T20:15:00.000Z', id_cliente: 20, estado: "Completado", nombre: 'Juan Perez'}}
        },
        404: {
            description: 'No hay Pedidos con id = 999',
            schema: { error: 'Pedido no encontrado en la BD.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    getPedidosId(req, res);
  },
);

// Traer el pedido con ID
router.get(
  "/cliente/:id",
  validateParamsSchema(idParamSchema),
  (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Pedido']
    #swagger.summary = 'Obtener todos los Pedidos de un cliente por ID_cliente'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico del Cliente',
    required: true,
    type: 'integer'
    }
    #swagger.responses = {
        200: {
            description: 'Busqueda exitosa',
            schema: { id: 1, fecha: '2026-08-27T20:15:00.000Z', id_cliente: 20, estado: "Completado", nombre: 'Juan Perez'}}
        },
        404: {
            description: 'No hay Pedidos con id = 999',
            schema: { error: 'Pedido no encontrado en la BD.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    getPedidosId_cliente(req, res);
  },
);

// Crear un nuevo Pedido
router.post(
  "/",
  validateBodySchema(pedidoBodySchema),
  (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Pedido']
    #swagger.summary = 'Crear un Pedido nuevo'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos para el nuevo Pedido. Solo el id_cliente es obligatorio.',
        required: true,
        schema: {fecha: '2026-08-27T20:15:00.000Z', id_cliente: 20, estado: "Completado"}
    }
    #swagger.responses = {
        201: {
            description: 'Registro de nuevo Pedido, exitoso',
            schema: {fecha: '2026-08-27T20:15:00.000Z', id_cliente: 20, estado: "Completado"}}
        },
        400: {
            description: 'No se pudo registrar el nuevo pedido.',
            schema: { error: 'Faltan datos obligatorios.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    createPedido(req, res);
  },
);

// Actualizar un Pedido con ID
router.put(
  "/:id",
  validateParamsSchema(idParamSchema),
  validateBodySchema(pedidoPutSchema),
  (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Pedido']
    #swagger.summary = 'Actualizar algun dato de un Pedido'
    #swagger.description = 'Modifica algun campo (fecha, id_cliente) de un Pedido buscando por su ID.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico del Pedido a actualizar',
        required: true,
        type: 'number'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Campos que se desean actualizar. Puede actualizar uno o todos los campos del Pedido',
        required: true,
        schema: {fecha: '2026-08-27T20:15:00.000Z', id_cliente: 20, estado: "Completado"}}
    }
    #swagger.responses = {
        200: {
            description: 'Pedido actualizado, exitosamente.',
            schema: {fecha: '2026-08-27T20:15:00.000Z', id_cliente: 20, estado: "Completado"}}
        },
        404: {
            description: 'No hay Pedidos con id = 999.',
            schema: { error: 'Pedido no encontrado en la BD.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    updatePedidoId(req, res);
  },
);

// Eliminar un Pedido con ID
router.delete(
  "/:id",
  validateParamsSchema(idParamSchema),
  (req: Request, res: Response) => {
    delPedido(req, res);
    /*
    #swagger.tags = ['Pedido']
    #swagger.summary = 'Eliminar un Pedido por ID'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico del Pedido',
    required: true,
    type: 'integer'
    }
    #swagger.responses = {
        200: {
            description: 'Eliminación exitosa',
            schema: { id: 1, fecha: '2026-08-27T20:15:00.000Z', id_cliente: 20, estado: "Completado"}}
        },
        404: {
            description: 'Pedido esta indexado con registros de tabla detalle_pedido en la BD.',
            schema: { error: 'No se puede eliminar, esta indexado a: [{},{}...{}].' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
  },
);

// Proteger de rutas no existentes para post
router.post("/*path", (req: Request, res: Response, next: NextFunction) => {
  /* #swagger.ignore = true */
  validarErrorPath(req, res, next);
});

export default router;
