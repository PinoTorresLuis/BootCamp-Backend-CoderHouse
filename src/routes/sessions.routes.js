import { Router } from "express";
import { userModel } from "../models/users.model.js";
import auth from "../auth.js";

const sessionRouter = Router();

sessionRouter.post('/login',async (req,res)=>{
    const {email, password} = req.body;

    try {
        if(req.session.login){
            res.status(200).send({respuesta:"Usuario ya logueado", message: user})
        }
        const user = await userModel.findOne({email:email}); //De esta forma me trae sólo el elemento que le pedi. Si pongo find, busca todos
    if(user){
        if(user.password === password){
            req.session.login = true;
            res.status(200).send({respuesta:"Admin logueado", message:user})
            //res.redirect('../views/home.handlebars',200,'info:info');
        } 
         else{
            res.status(401).send({error:"Error de contraseña",message:user})
        }
    }else { 
        res.status(404).send({error:"No se encontró el email ingresado",message:user})
    }
    } catch (error) {
        res.status(404).send({error:"No existe el usuario, por favor registrate",message:user})
    }
});

sessionRouter.get('/admin', auth,(req,res)=>{
    res.send("Bienvenido Admin")
})

sessionRouter.get('/logout', (req,res)=>{
    if(req.session.login){
        req.session.destroy();
        res.render("/signIn");
    }
    res.status(200).send({resultado:"Sesión eliminada"})
});



export default sessionRouter;