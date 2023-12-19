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
//Ruta de Logger
import loggerRouter from './logger.routes.js';
//Ruta de Registro
import userRouter from './users.routes.js';
//Función para conectarse con Swagger
import swaggerConnect from '../config/swagger.js';


const router = Router();

router.use('/api/products', productRouter);
router.use('/api/carts',cartRouterDB);
router.use('/api/session', sessionRouter);
router.use('/api/users', userRouter);
router.use('/api/mockingproducts', mockingRouter);
router.use('/api/nodemailer', nodeMailer);
router.use('/api/logger', loggerRouter);
router.use('/static',routerHandleBars);
router.use('/apidocs/', swaggerConnect()); //En esta ruta me conecto a Swagger y el setup va a ir confingurado con las opciones de la variable que creamos. La documentación no va a hacer algo ajeno a mi APP sino que es un complemento ya que posee una ruta. De esta forma la documentación también forma parte del proyecto.

export default router;