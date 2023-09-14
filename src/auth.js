
export default function auth (req,res,next){
    console.log(req.session.email);

    if(req.session.email === "admin@admin.com"){
        return next() //Continua con la ejecución normal de la ruta
    }
    //en el caso de que no tenga acceso
    return res.send("No tenes acceso")
}