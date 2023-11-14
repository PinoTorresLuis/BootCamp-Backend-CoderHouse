import 'dotenv/config'
import { nodeMailer } from '../models/mailer.model.js';


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
