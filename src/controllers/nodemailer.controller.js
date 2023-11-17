import 'dotenv/config'
import nodemailer from 'nodemailer';
import { nodeMailer } from '../models/mailer.model.js';
import { logger } from '../utils/logger.js';

//esto iria en config
const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:'lpino7340@gmail.com',
            pass: process.env.PASSWORD_EMAIL,
            authMethod:'LOGIN'
        }
 
})

export const sendMail = async(req,res)=>{
    try {
        const resultado = await nodeMailer.sendMail({
            from:'TEST From lpino',
            to: 'luispinito.torres@gmail.com',
            subjet:'Saludo de buenos días',
            html:`
                <div>
                    <h1>Hola,buenos días</h1>
                    </div>
            `,
            attachments:[]//aca agrego algún elemento extra como por ejemplo, un pdf.
        })
        res.status(200).send({mensaje:'mail enviado'});
    } catch (error) {
        res.status(404).send(error);
        
    }
  
}

export const sendRecoveryEmail = (email,recoveryLink)=>{
    const emailOptions = {
        from:' luispinito.torres@gmail.com',
        to:email,
        subject: 'Link de recuperación de su contraseña',
        text: `Por favor haz click en el siguiente enlace ${recoveryLink}`
    }

    transporter.sendMail(emailOptions,(error,info)=>{
        if(error){
            logger.error(error);
        }
        else{
            logger.error('Email enviado correctamente')
        }
    })
}