import { Router } from "express";

const routerHandleBars = Router();

//Routes
routerHandleBars.get ('/realtimeproducts', (req,res)=>{
    res.render("realTimeProducts",{ //Indicar que plantilla voy a utilizar
        titulo: "realTimeProducts",
        rutaJS: "realTimeProducts.js",
        rutaCSS: "form.css"
    })
})

routerHandleBars.get ('/home', (req,res)=>{
    res.render("home",{
        titulo: "home",
        rutaJS: "home.js",
        rutaCSS: "home.css"
    })
})

export default routerHandleBars