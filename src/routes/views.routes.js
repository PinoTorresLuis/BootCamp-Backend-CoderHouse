import { Router } from "express";

const routerHandleBars = Router();

routerHandleBars.get ('/static', (req,res)=>{
    res.render("chat",{
        titulo: "Chat",
        rutaJS: "chat.js",
        rutaCSS: "style.css"
    })
})

//Indicar que plantilla voy a utilizar
/* res.render('realt',{
    titulo:"realt",
    usuario: user,
    isTutor: user.cargo === "Tutor",
    cursos:cursos
})  */

export default routerHandleBars