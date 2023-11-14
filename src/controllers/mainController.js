import { logger } from "../utils/logger.js";

export const getMain = (req,res)=>{
    logger.info('Mi primer log')
    try {
        logger.warning('Estamos entrando en la prueba de error');
        throw new Error ('Test Error')
    } catch (error) {
        logger.error(`[ERROR][${new Date().toLocaleString()} - ${new Date().toLocaleTimeString()}] -Ocurrió un error: ${error.message}`);
        res.status(500).send({message:'Internal server error'})
    }
    res.status(200).send('Logger creado correctamente')
}

export const postMain = (req,res)=>{
    res.status(201).send('POST Request to the main')
}


export function requestLogger(req,res,next){
    logger.info(`Request ${req.method} - ${req.url} - Date: ${new Date().toLocaleString()}`)
    next()
}