import { Router } from "express";
//import { userModel } from "../models/users.model.js";
//import { createHash } from "../utils/bcrypt.js";
import passport from "passport";

const userRouter = Router();

/* userRouter.get('/', async(req,res)=>{
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send({error:"Error al consultar por el usuario",error});
    }
}) 


 const {first_name,lastname,email,password,age} = req.body
    console.log(req.body);
    try {
        const hashPassword = createHash(password);
        const resultado = await userModel.create({
            first_name:first_name,
            lastname:lastname,
            email:email,
            password:hashPassword,
            age:age})
        if(resultado){
            console.log(resultado);
            res.redirect('/static/products');
        } 
    } catch (error) {
        res.status(400).send({error:'Error al crear el usuario:',error}) 
    }
*/

userRouter.post('/register', passport.authenticate('register') , async(req,res)=>{
   try {
        if(!req.user){
            res.status(400).send({mensaje:"Usuario ya creado"})
        }
        return res.send(200).send({mensaje:"Usuario creado correctamente"})

   } catch (error) {
        res.status(500).send({error:'Error al crear usuario',error})
   }
})

export default userRouter;