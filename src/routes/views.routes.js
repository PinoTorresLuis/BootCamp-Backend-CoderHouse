import { Router } from "express";
import { ProductManager } from '../controllers/productManager.js';

const routerHandleBars = Router();

const products = new ProductManager ('src/models/productos.json')

//Routes de las views
//Ruta del HandleBars Realtimeproducts
routerHandleBars.get('/realtimeproducts', async (req,res)=>{
    res.render("realTimeProducts",{ //Ruta para mostrar el formulario
        titulo: "realTimeProducts",
        rutaJS: "realTimeProducts.js",
        rutaCSS: "form.css",
    })
})

//Ruta del HandleBars Home
routerHandleBars.get ('/home', async (req,res)=>{
    res.render("home",{
        titulo: "home",
        rutaJS: "home.js",
        rutaCSS: "home.css",
        products : await products.getProducts()
    })
})

//Ruta del HandleBars Chat
routerHandleBars.get('/chat', async(req,res)=>{
    res.render("chat",{
        titulo:"chat",
        rutaJS:"chat.js",
        rutaCSS:"chat.css"
    })
})


//Ruta del HandleBars Login
routerHandleBars.get('/users', async(req,res)=>{
    res.render("singIn",{
        titulo:"login",
        rutaJS:"login.js",
        rutaCSS:"login.css"
    })
})

routerHandleBars.get('/users/singUp', async(req,res)=>{
    res.render("singUp",{
        titulo:"login",
        rutaJS:"login.js",
        rutaCSS:"login.css"
    })
})


export default routerHandleBars