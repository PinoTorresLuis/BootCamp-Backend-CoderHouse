import 'dotenv/config'
import nodemailer from nodemailer;

export const createMailer = ()=>{
let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:'lpino7340@gmail.com',
        pass: process.env.PASSWORD_EMAIL,
        authMethod:'LOGIN'
    }
})
}
