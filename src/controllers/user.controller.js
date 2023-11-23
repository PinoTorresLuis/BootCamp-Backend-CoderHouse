import { userModel } from "../models/users.model.js";
import { logger } from "../utils/logger.js";

import crypto from 'crypto';
import { createHash, validatePassword } from '../utils/bcrypt.js';
import { sendLinkRecoveryPassword} from "./nodemailer.controller.js";


//Función para registrarse
export const userRegister = async(req,res)=>{
    try {
        if(!req.user){
            res.status(400).send({mensaje:"Usuario ya creado"});
        }
        return res.status(200).send({mensaje:"Usuario creado correctamente"});
    } catch (error) {
        logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} Ha ocurrido un error: ${error.message}`)
        res.status(500).send({error:"Error al crear usuario", error});
    }
}

//Función para traer a los usuarios 
export const getUser = async(req,res)=>{
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (error) {
        logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} Ha ocurrido un error: ${error.message}`)
        res.status(400).send({error:"Error al consultar por el usuario",error});
    }
}

/* 
export const newRol = async(req,res)=>{
    const {email} = req.body;
    console.log(email)
    try {
        const user = await userModel.findOne(email)
        if(!user){
            return res.status(404).send('User not found')
        }

        await userModel.findOneAndUpdate({email}, {rol:'premium'})
        
        res.status(200).send({mensaje:'Tu rol ha cambiado a User Premium'})
    } catch (error) {
        res.status(500).send('Error al cambiar tu rol', error)        
    }
}
 */
const recoveryLinks = {};

export const passwordRecovery =async(req,res)=>{
    const {email} = req.body;
    try {
        const user = await userModel.find({email:email})
        if(user){
    //Verificación de usuario existente
    const token = crypto.randomBytes(20).toString('hex')//"Token único con el fin de no utilizar JWT para algo simple"
    recoveryLinks[token] = {email,timestamp:Date.now()}
    //Este token va a recibir un email + la hora actual
    const recoveryLink = `http://localhost:4000/api/nodemailer/reset-password/${token}`
    sendLinkRecoveryPassword(email,recoveryLink);//Envio el email y el link
    res.status(200).send('Correo de recuperación enviado correctamente')
    }
    } catch (error) {
        logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} Ha ocurrido un error: ${error.message}`)
        res.status(500).send('Error al enviar la recuperación de contraseña')
    }
}

export const resetPassword = async(req,res)=>{
    const {token} = req.params;
    const {newPassword} = req.body;
    try {
    //Primero verifico si el Token es válido y no ha expirado
    const linkData = recoveryLinks[token] //Es un array que guarda cada uno de los token
    console.log(token)
    if(linkData && Date.now() - linkData.timestamp < 3600000){
        const {email} = linkData
        const user = await userModel.findOne({email:email});
        const comparePassword = validatePassword(newPassword, user.password);
        if(!comparePassword){
            const hashPassword = createHash(newPassword);
            await userModel.findOneAndUpdate({ email }, { password: hashPassword });
        }else {
            res.status(400).send('No puede modificar la contraseña por una ya utilizada anteriormente');
        }
      
        delete recoveryLinks[token]
        res.status(200).send("Contraseña modificada correctamente")
    }else {
        res.status(400).send('Token invalido o expirado, pruebe nuevamente')
    }}catch (error) {
        logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} Ha ocurrido un error: ${error.message}`);
        res.status(500).send('Error al cambiar la contraseña de cliente:', error)        
    }
}

