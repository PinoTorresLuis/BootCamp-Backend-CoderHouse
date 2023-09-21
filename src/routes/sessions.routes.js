import { Router } from "express";
import { userModel } from "../models/users.model.js";
import auth from "../auth.js";

const sessionRouter = Router();

sessionRouter.post('/login', auth, async (req,res)=>{
    const {email, password} = req.body;
    console.log('Datos del formulario:', req.body);
    try {
         if(req.session.login){
            res.status(200).send({respuesta:"Usuario ya logueado", message: user})
        } else{
        const user = await userModel.findOne({email:email}); //De esta forma me trae sólo el elemento que le pedi. Si pongo find, busca todos
    if(user){
        if(user.password == password){
            req.session.login = true;
            res.redirect('/static/products');
        } 
         else{
            res.status(401).send({error:"Error de contraseña",message:user.password})
        }
    }else { 
        res.status(404).send({error:"No se encontró el email ingresado",message:user})
    }
    }
    } catch (error) {
        res.status(400).send({error:"No existe el usuario, por favor registrate"})
    }
});


sessionRouter.get('/logout', (req,res)=>{
    if(req.session.login){
        req.session.destroy();
        res.redirect("/static/signin");
    }
   
});



export default sessionRouter;