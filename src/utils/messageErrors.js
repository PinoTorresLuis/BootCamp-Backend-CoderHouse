import passport from "passport";

//Función general para retornar errores en las estrategias de passport.
export const passportError = (strategy)=>{
    //Primer filtro de cualquier estrategia de Passport
    return async(req,res,next)=>{
        passport.authenticate(strategy,(error,user,info)=>{
            if (error){ //Retornamos el error
                return next(error)
            }
            if (!user){
                res.status(401).send({error:info.messages ? info.messages : info.toString()})//Si me envían ifo message, muestro la respuesta que me enviaron, sino muestro el objeto info pasado a string(Pueden enviar info.messages = "Usuario no valido" o info = "User no validado")
            }
            req.user = user;
            next();
        })(req,res,next); //Esto es porque es un middleware porque va a estar entre mi ruta y mi aplicación. Retorno lo que sería la aplicación. No está como middweare ya implementando, sino que lo implemento a traves de una función passportError y el valor que ingrese va a estar al nivel del Middware
    }
}