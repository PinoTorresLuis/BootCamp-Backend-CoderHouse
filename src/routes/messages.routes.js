import { Router } from "express";

const messagesRouter = Router();



messagesRouter.get('/', async(req,res)=>{
    try {
        const messages = await messagesModel.find()
        if(messages){
            res.status(200).send({respuesta:"ok", mensaje:messages})
        }
    } catch (error) {
        res.status(400).send({respuesta:"No se encontró ningun chat", mensaje:error})
    }
})


messagesRouter.post('/', async (req,res)=>{
    const {email,messages }= req.body;
    
    try {
       const mensaje =  await messagesModel.create({email,messages})
        if(mensaje){
        res.status(200).send({ message: 'Usuario creado correctamente'})};
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }
}) 

messagesRouter.get('/chat', async(req,res)=>{
    res.render("chat",{
        titutlo:"chat",
        rutaJS:"chat.js",
        rutaCSS:"chat.css"
    })
})

export default messagesRouter;