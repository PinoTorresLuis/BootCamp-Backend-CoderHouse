import { logger } from "./utils/logger.js";

export default function auth (req,res,next){
    const {email, password} = req.body
    logger.info(email,password);

    if(email === "admin@admin.com" && password== "1234"){
        logger.info("felicitaciones ingresaste correctamente", email)
        return res.redirect("/static/admin");
       
    }
    //en el caso de que no tenga acceso
    return next() //Continua con la ejecución normal de la ruta
}