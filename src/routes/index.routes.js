import { Router } from 'express';
//Ruta de HandleBars
import routerHandleBars from './views.routes.js';
//Ruta de ProductsDB
import productRouter from './productsdb.routes.js';
//Ruta de CartProductsDB
import cartRouterDB from './cartdb.routes.js';
//Ruta de SessionesDB
import sessionRouter from "./sessions.routes.js";
//Ruta de MockingProducts
import mockingRouter from './mockingproducts.routes.js';
//Ruta de NodeMailer
import nodeMailer from './nodemailer.routes.js';
import loggerRouter from './logger.routes.js';
//Ruta de Registro
import userRouter from './users.routes.js';

const router = Router();

router.use('/api/products', productRouter);
router.use('/api/carts',cartRouterDB);
router.use('/api/session', sessionRouter);
router.use('api/users', userRouter);
router.use('/api/mockingproducts', mockingRouter);
router.use('/api/nodemailer', nodeMailer);
router.use('/api/logger', loggerRouter);
router.use('/static',routerHandleBars);

export default router;