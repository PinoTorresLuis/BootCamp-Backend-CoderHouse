import { Router } from "express";
import { getMain, requestLogger } from "../controllers/mainController.js";

const loggerRouter = Router();

loggerRouter.get('/',requestLogger, getMain);

export default loggerRouter;
