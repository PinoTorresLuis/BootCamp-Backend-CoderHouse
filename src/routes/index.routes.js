import { Router } from 'express';
//Ruta de HandleBars
import routerHandleBars from './views.routes.js';
//Ruta de ProductsDB
import productRouter from './productsdb.routes.js';
//Ruta de CartProductsDB
import cartRouterDB from './cartdb.routes.js';
//Ruta de SessionesDB
import sessionRouter from "./sessions.routes.js";
import mockingRouter from './mockingproducts.routes.js';
import mailerRouter from './nodemailer.routes.js';
import loggerRouter from './logger.routes.js';

const router = Router();

router.use('/api/products', productRouter);
router.use('/api/carts',cartRouterDB);
router.use('/api/session', sessionRouter);
router.use('/api/mockingproducts', mockingRouter);
router.use('/api/mail', mailerRouter);
router.use('/api/logger', loggerRouter);
router.use('/static',routerHandleBars);

export default router;