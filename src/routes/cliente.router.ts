import { Router } from "express";
import {
  getCliente,
  getClienteId,
  createCliente,
  updateCliente,
  delCliente,
} from "../controllers/cliente.controller.js";
import type { Request, Response, NextFunction } from "express";
import { validarErrorPath } from "../middlewares/validalar.middleware.js";
import {
  validateBodySchema,
  validateParamsSchema,
} from "../middlewares/validateSchema.middleware.js";
import idParamSchema from "../schemas/idParam.schema.js";
import {
  clienteBodySchema,
  clientePutSchema,
} from "../schemas/cliente.schema.js";

const router: Router = Router();

// Traer todos los clientes
router.get("/", (req: Request, res: Response) => {
  /*  
    #swagger.tags = ['Cliente']
    #swagger.summary = 'Obtener y filtrar todos los Clientes'
    #swagger.description = 'Retorna la lista de clientes permitiendo filtrar por nombre, email o telefono.'
    #swagger.parameters['nombre'] = {
            in: 'query',
            description: 'Filtro por nombre del producto',
            required: false,
            type: 'string'
        }
        #swagger.parameters['email'] = {
            in: 'query',
            description: 'Filtro por email',
            required: false,
            type: 'string'
        }
        #swagger.parameters['telefono'] = {
            in: 'query',
            description: 'Filtro por alguna palabra de la descripcion',
            required: false,
            type: 'string'
        }
    #swagger.responses = {
        200: {
            description: 'Clientes hallados satisfactoriamente.',
            schema: {
                type: 'array',
                items: { $ref: '#/definitions/Clientes' }
            }
        },  
        404: {
            description: 'No hay clientes en la BD.',
            schema: { error: 'No hay clientes en la BD.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
  getCliente(req, res);
});

// Traer el cliente con ID
router.get(
  "/:id",
  validateParamsSchema(idParamSchema),
  (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Cliente']
    #swagger.summary = 'Obtener un cliente por ID'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico del cliente',
    required: true,
    type: 'integer'
    }
    #swagger.responses = {
        200: {
            description: 'Busqueda exitosa',
            schema: { id: 1, nombre: 'Marck Bolaños', email: 'mbolannos@gmail.com', telefono: '+51 999123465'}
        },
        404: {
            description: 'No hay clientes con id = 999',
            schema: { error: 'Cliente no encontrado en la BD.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    getClienteId(req, res);
  },
);

// Crear un nuevo cliente
router.post(
  "/",
  validateBodySchema(clienteBodySchema),
  (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Cliente']
    #swagger.summary = 'Crear un cliente nuevo'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos para el nuevo cliente. Todos los datos son obligatorios.',
        required: true,
        schema: { nombre: 'Marck Bolaños', email: 'mbolannos@gmail.com', telefono: '+51 999123465'}
    }
    #swagger.responses = {
        201: {
            description: 'Registro de nuevo cliente, exitoso',
            schema: { id: 1, nombre: 'Marck Bolaños', email: 'mbolannos@gmail.com', telefono: '+51 999123465'}
        },
        400: {
            description: 'No se pudo registrar al nuevo cliente.',
            schema: { error: 'Faltan datos obligatorios.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    createCliente(req, res);
  },
);

// Actualizar un cliente con ID
router.put(
  "/:id",
  validateParamsSchema(idParamSchema),
  validateBodySchema(clientePutSchema),
  (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Cliente']
    #swagger.summary = 'Actualizar algun dato de un Cliente'
    #swagger.description = 'Modifica todos campos (nombre, email, telefono) de un Cliente buscando por su ID.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico del producto a actualizar',
        required: true,
        type: 'number'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Campos que se desean actualizar. Puede actualizar uno o todos los campos del Producto',
        required: true,
        schema: { nombre: 'Marck Bolaños', email: 'mbolannos@gmail.com', telefono: '+51 999123465'}
    }
    #swagger.responses = {
        200: {
            description: 'Cliente actualizado, exitosamente.',
            schema: { id: 1, nombre: 'Marck Bolaños', email: 'mbolannos@gmail.com', telefono: '+51 999123465'}
        },
        404: {
            description: 'No hay clintes con id = 999.',
            schema: { error: 'Cliente no encontrado en la BD.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    updateCliente(req, res);
  },
);

// Eliminar un producto con ID
router.delete(
  "/:id",
  validateParamsSchema(idParamSchema),
  (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Cliente']
    #swagger.summary = 'Eliminar un Cliente por ID'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico del producto',
    required: true,
    type: 'integer'
    }
    #swagger.responses = {
        200: {
            description: 'Eliminación exitosa',
            schema: { id: 1, nombre: 'Marck Bolaños', email: 'mbolannos@gmail.com', telefono: '+51 999123465'}
        },
        404: {
            description: 'Cliente esta indexado con registros de tabla Pedido en la BD.',
            schema: { error: 'No se puede eliminar, esta indexado a: [{},{}...{}].' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    delCliente(req, res);
  },
);

// Proteger de rutas no existentes para post
router.post("/*path", (req: Request, res: Response, next: NextFunction) => {
  /* #swagger.ignore = true */
  validarErrorPath(req, res, next);
});

export default router;
