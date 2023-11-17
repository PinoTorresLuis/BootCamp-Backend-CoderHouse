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

    sendRecoveryEmail(email,recoveryLink);
    res.status(200).send('Correo de recuperación enviado correctamente')
    } catch (error) {
        res.status(500).send('Error al enviar la recuperación de contraseña')
    }
});
 
mailerRouter.post('/reset-password/:token', (req,res)=>{
    const {token} = req.params;
    const {newPassord, oldPassword} = req.body;
    //Primero verifico si el Token es válido y no ha expirado
    const linkData = recoveryLinks[token]
    if(linkData && Date.now() - linkData.timestamp < 3600000){
        const {email} = linkData
        //Cambio de contraseña(modificar cliente);

        //Consultar si la nueva contraseña es distinta a la antigua

        delete recoveryLinks[token]
        res.status(200).send("Contraseña modificada correctamente")
    } 
})

export default mailerRouter;