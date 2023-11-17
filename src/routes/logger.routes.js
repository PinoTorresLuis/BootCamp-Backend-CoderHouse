import { Router } from "express";
import { logger } from "../utils/logger.js";

const loggerRouter = Router();

loggerRouter.get('/', (req, res) => {
	logger.debug('Esto es una prueba de logger Debug');
	logger.info('Esto es una prueba de logger Info');
	logger.warning(
		`[WARNING][${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] Warning: Esto es un mensaje de prueba`
	);
	logger.error(
		`[ERROR][${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] Error: Esto es un mensaje de prueba`
	);
	logger.fatal(
		`[ERROR FATAL][${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] Fatal: Esto es un mensaje de prueba`
	);

	res.status(200).send('Prueba realizada con éxito');
});

export default loggerRouter;
