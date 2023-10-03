import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";
//import auth from "../auth.js";

const sessionRouter = Router();

sessionRouter.post('/login', passport.authenticate('login'), async (req,res)=>{
   
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
        const token = generateToken(req.user)
        req.cookies('jwtCookie',token,{
            maxAge: 43000000
        })
        res.status(200).send({payload:req.user})
    } catch (error) {
        res.status(500).send({error:"Error al iniciar sesión", error})
    }

});
//Esta es la ruta de creación de Usario
sessionRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), async(req,res)=>{
    res.status(200).send({mensaje:'Usuario creado'});

});
//Ruta de inicio de sesión
sessionRouter.get('/githubSession', passport.authenticate('github'), async(req,res)=>{
    req.session.user = req.user;
    res.status(200).send({mensaje:'sesión creada'})
})

//Prueba de inicio de sesión para el manejo de JWT
sessionRouter.get('/testJWT', passport.authenticate('jwt', {session:false}),async(req,res)=>{
    res.status(200).send({mensaje:req.user});
    console.log(req.user.user);
    req.session.user = {
        first_name: req.user.user.first_name,
        lastname : req.user.user.lastname,
        age:req.user.user.age,
        email:req.user.user.email
    }
})

sessionRouter.get('/logout', (req,res)=>{
    if(req.session){ //Si existe la sesión, la borramos.
        req.session.destroy();
        res.redirect("/static/signin");
    }
    res.clearCookie('jwtCookie') //Elimino la Cookie
});

export default sessionRouter;

