import { Router } from "express";
//import { userModel } from "../models/users.model.js";
import auth from "../auth.js";


import passport from "passport";

const sessionRouter = Router();
/* 
 const {email, password} = req.body;
    console.log('Datos del formulario:', req.body);
    try {
         if(req.session.login){
            res.status(200).send({respuesta:"Usuario ya logueado", message: user})
        } else{
        const user = await userModel.findOne({email:email}); //De esta forma me trae sólo el elemento que le pedi. Si pongo find, busca todos
    if(user){
        if(validatePassword(password,user.password)){//Validate devuelte boolean: Si es true, ingresa a su usuario.
            req.session.login = true;
            res.redirect(`/static/products?info=${user.first_name}`);
        } 
         else{
            res.status(401).send({error:"Error de contraseña",message:user.password})
        }
    }else { 
        res.status(404).send({error:"No se encontró el email ingresado",message:user})
    }
    }
    } catch (error) {
        res.status(400).send({error:"No existe el usuario, por favor registrate"});
    }
*/
sessionRouter.post('/login',auth, passport.authenticate('login'), async (req,res)=>{
   
    try {
        if(!req.user){
            res.status(401).send({error:"Invalidate user"})
        }
        req.session.user = {
            first_name : req.user.first_name,
            lastname: req.user.lastname,
            age:req.user.age,
            email:req.user.email
        }
        res.status(200).send({payload:req.user})
    } catch (error) {
        res.status(500).send({error:"Error al iniciar sesión", error})
    }

});

sessionRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), async(req,res)=>{
    res.status(200).send({mensaje:'Usuario creado'});

});

sessionRouter.get('/githubSession', passport.authenticate('github'), async(req,res)=>{
    req.session.user = req.user;
    res.status(200).send({mensaje:'sesión creada'})
})

sessionRouter.get('/logout', (req,res)=>{
    if(req.session.login){
        req.session.destroy();
        res.redirect("/static/signin");
    }
   
});



export default sessionRouter;