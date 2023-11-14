import { logger } from "../utils/logger.js";

export default class CustomError {
    static createError({name="Error",cause,message,code=1}){
        const error = new Error(message);
        error.name=name;
        error.cause=cause;
        error.code=code;
        logger.error(
			`[ERROR][${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] Ha ocurrido un error: ${
				error.message
			}`);
        return error;
    }
}