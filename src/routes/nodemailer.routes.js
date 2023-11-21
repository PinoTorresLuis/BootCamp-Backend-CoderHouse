import { Router } from "express";
import crypto from 'crypto';
import { sendMail, sendRecoveryEmail} from "../controllers/nodemailer.controller.js";

const mailerRouter = Router();
const recoveryLinks = {}
mailerRouter.post('/password-recovery',(req,res)=>{
    const {email} = req.body;
    try {
    //Verificación de usuario existente
    const token = crypto.randomBytes(20).toString('hex')//"Token único con el fin de no utilizar JWT para algo simple"
    recoveryLinks[token] = {email,timestamp:Date.now()}
    //Este token va a recibir un email + la hora actual
    const recoveryLink = `http://localhost:4000/api/nodemailer/reset-password/${token}`
       
    sendRecoveryEmail(email,recoveryLink);//Envio el email y el link
    res.status(200).send('Correo de recuperación enviado correctamente')
    } catch (error) {
        res.status(500).send('Error al enviar la recuperación de contraseña')
    }
});
 //Ruta para resetear la contraseña
mailerRouter.post('/reset-password/:token', (req,res)=>{
    const {token} = req.params;
    const {newPassord, oldPassword} = req.body;
    try {
          //Primero verifico si el Token es válido y no ha expirado
    const linkData = recoveryLinks[token]
    if(linkData && Date.now() - linkData.timestamp < 3600000){
        const {email} = linkData
        //Cambio de contraseña(modificar cliente);
            //Acá tendría que poner la lógica de cambiar la contraseña
        //Consultar si la nueva contraseña es distinta a la antigua
        //Acá tendría que poner la lógica
        delete recoveryLinks[token]
        res.status(200).send("Contraseña modificada correctamente")
    }} catch (error) {
        res.status(400).send('Token invalido o expirado, pruebe nuevamente')        
    }
})

export default mailerRouter;