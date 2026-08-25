import { Router } from "express";
import { getProductosAll } from '../controllers/producto.controller.js';

const router: Router = Router();

router.get('/', getProductosAll);

export default router;