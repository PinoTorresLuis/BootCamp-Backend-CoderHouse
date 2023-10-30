import { Router } from "express";
import passport from "passport";
import { createUserGitHub, loginGitHub, logout, sessionLogin, testSessionJWT, userCurrent, userRegister } from "../controllers/session.controller.js";
import { passportError, authorization } from "../utils/messageErrors.js";
const sessionRouter = Router();

//Prueba de inicio de sesión para el manejo de JWT
sessionRouter.post('/register', passport.authenticate('register'),userRegister);
sessionRouter.post('/login', passport.authenticate('login'),sessionLogin);
//Ruta de creación de Usario
sessionRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), createUserGitHub);
//Ruta de inicio de sesión
sessionRouter.get('/githubSession', passport.authenticate('github'),loginGitHub);
//Prueba de inicio de sesión para el manejo de JWT
sessionRouter.get('/testJWT', passport.authenticate('jwt', {session:false}),testSessionJWT);
//Prueba de inicio de sesión para current
sessionRouter.get('/current', passportError('jwt'), authorization('user'), userCurrent); //Si quiero mandar varias opciones tengo que hacer un array en Authorization ['User','UserPremium]
//Ruta para cerrar sesión
sessionRouter.get('/logout',logout);

export default sessionRouter;

