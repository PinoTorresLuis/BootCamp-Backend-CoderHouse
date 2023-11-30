import { Router } from "express";
import passport from "passport";
import { getUser,  getUsers,  passwordRecovery, resetPassword, userRegister } from "../controllers/user.controller.js";

const userRouter = Router();
//Ruta para encontrar el usuario
userRouter.get('/:id', getUser);
//Ruta para traer todos los usuarios
userRouter.get('/',getUsers )
//Ruta para registrar usuario
userRouter.post('/', passport.authenticate('register'),userRegister);
//Ruta para resetear-password
userRouter.post('/password-recovery', passwordRecovery);
 //Ruta para resetear la contraseña
userRouter.post('/reset-password/:token', resetPassword);

    
export default userRouter;
