import 'dotenv/config';
import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

//Config de Mailing
let transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:'lpino7340@gmail.com',
            pass: process.env.PASSWORD_EMAIL,
            authMethod:'LOGIN'
        },
})

export const sendMail = async(req,res)=>{
    try {
        const resultado = await transporter.sendMail({
            from:'TEST From lpino7340@gmail.com',
            to: 'luispinito.torres@gmail.com',
            subjet:'Buenas tardes!',
            html:`
                <div>
                    <h1>Hola,buenas tardes</h1>
                </div>
            `,
            attachments:[]//aca agrego algún elemento extra como por ejemplo, un pdf.
        })
        res.status(200).send({mensaje:'mail enviado', respuesta:resultado});
    } catch (error) {
        logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} Ha ocurrido un error: ${error.message}`)
        res.status(404).send(error);
        
    }
}

export const sendLinkRecoveryPassword = (email,recoveryLink)=>{
    const mailOptions = {
        from:' luispinito.torres@gmail.com',
        to:email,
        subject: 'Link de recuperación de su contraseña',
        text: `Por favor haz click en el siguiente enlace ${recoveryLink}`
    }

transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            logger.error(
                `[ERROR][${new Date().tolocaleDateString()} - ${new Date().tolocaleTimeString()}] Ha ocurrido un error: ${
					error.message
				}`  
            );
        }
        else{
            logger.info('Email enviado correctamente')
        }
    })
}

