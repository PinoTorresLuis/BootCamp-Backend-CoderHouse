export default function auth (req,res,next){
    const {email} = req.body
    console.log(req.session.email);

    if(req.session.email === "admin@admin.com"){
        req.session.email = email;
        console.log("felicitaciones ingresaste correctamente", email)
        return res.redirect("/static/admin");
       
    }
    //en el caso de que no tenga acceso
    return next() //Continua con la ejecución normal de la ruta
}