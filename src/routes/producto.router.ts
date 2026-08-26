import { Router } from "express";
import { getMenu, getProduct, createProduct, updateProduct, delProduct } from '../controllers/producto.controller.js';
import type { Request, Response, NextFunction } from "express";
import { validarErrorPath, validarId } from "../middlewares/validalar.middleware.js";

const router: Router = Router();

// Traer todos los productos
router.get('/menu', (req: Request, res: Response) => {
    /*  
        #swagger.tags = ['Menu']
        #swagger.summary = 'Obtener y filtrar todos los Productos del Menu'
        #swagger.description = 'Retorna la lista de productos permitiendo filtrar por nombre, PrecioMax o descripcion.'
        #swagger.parameters['nombre'] = {
                in: 'query',
                description: 'Filtro por nombre del producto',
                required: false,
                type: 'string'
            }
            #swagger.parameters['precio'] = {
                in: 'query',
                description: 'Filtro por -precio maximo-',
                required: false,
                type: 'number'
            }
            #swagger.parameters['descripcion'] = {
                in: 'query',
                description: 'Filtro por alguna palabra de la descripcion',
                required: false,
                type: 'string'
            }
        #swagger.responses = {
            200: {
                description: 'Estudiantes hallados correctamente.',
                schema: {
                    type: 'array',
                    items: { $ref: '#/definitions/Estudiante' }
                }
            },  
            404: {
                description: 'El estudiante solicitado no existe.',
                schema: { error: 'El estudiante con el id = 99, no existe.' }
            },
            500: {
                description: 'Error interno del servidor.',
                schema: { error: 'Mensaje de error específico' }
            }
        }
    */
    getMenu(req, res);
});

// Traer el producto con ID
router.get('/menu/:id', validarId, (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Menu']
    #swagger.summary = 'Obtener un Producto del Menu por ID'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico del producto',
    required: true,
    type: 'integer'
    }
    #swagger.responses = {
        200: {
            description: 'Busqueda exitosa',
            schema: { id: 1, nombre: 'Ceviche', precio: 20, descripcion: 'Pescado A1 en trozos con citricos, especias y cebolla'}
        },
        404: {
            description: 'No hay productos con id = 999',
            schema: { error: 'Producto no encontrado en la BD.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    getProduct(req, res);
});

// Crear un nuevo producto
router.post('/menu', (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Menu']
    #swagger.summary = 'Crear un producto nuevo para el Menu'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos para el nuevo estudiante. Todos los datos son obligatorios.',
        required: true,
        schema: {
            nombre: 'Ceviche',
            precio: 20,
            descripcion: 'Pescado A1 en trozos con citricos, especias y cebolla'
        }
    }
    #swagger.responses = {
        201: {
            description: 'Registro de nuevo menu, exitoso',
            schema: { id: 1, nombre: 'Ceviche', precio: 20, descripcion: 'Pescado A1 en trozos con citricos, especias y cebolla'}
        },
        400: {
            description: 'No se pudo registrar el nuevo menu.',
            schema: { error: 'Faltan datos obligatorios.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    createProduct(req, res);
});

// Actualizar un producto con ID
router.put('/menu/:id', validarId, (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Menu']
    #swagger.summary = 'Actualizar algun dato de un Producto del Menu'
    #swagger.description = 'Modifica todos campos (nombre, precio, descripcion) de un Producto buscando por su ID.'
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
        schema: {
            nombre: 'Ceviche',
            precio: 20,
            descripcion: 'Pescado A1 en trozos con citricos, especias y cebolla'
        }
    }
    #swagger.responses = {
        200: {
            description: 'Producto actualizado, exitosamente.',
            schema: { id: 1, nombre: 'Ceviche', precio: 20, descripcion: 'Pescado A1 en trozos con citricos, especias y cebolla'}
        },
        404: {
            description: 'No hay productos con id = 999.',
            schema: { error: 'Producto no encontrado en la BD.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    updateProduct(req, res);
});

// Eliminar un producto con ID
router.delete('/menu/:id', validarId, (req: Request, res: Response) => {
    delProduct(req, res);
    /*
    #swagger.tags = ['Menu']
    #swagger.summary = 'Eliminar un Producto del Menu por ID'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico del producto',
    required: true,
    type: 'integer'
    }
    #swagger.responses = {
        200: {
            description: 'Eliminación exitosa',
            schema: { id: 1, nombre: 'Ceviche', precio: 20, descripcion: 'Pescado A1 en trozos con citricos, especias y cebolla'}
        },
        404: {
            description: 'Producto esta indexado con registros de otra tabla en la BD.',
            schema: { error: 'No se puede eliminar, esta indexado a: [{},{}...{}].' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
});

// Proteger de rutas no existentes para post
router.post('/menu/*path', (req: Request, res: Response, next: NextFunction) => {
    /* #swagger.ignore = true */
    validarErrorPath(req, res, next);
});

export default router;