import { Router } from "express";

const routerHandleBars = Router();

import { ProductManager } from '../controllers/productManager.js';

const products = new ProductManager ('src/models/productos.json')


//Routes

routerHandleBars.get('/realtimeproducts', async (req,res)=>{
    res.render("realTimeProducts",{ //Ruta para mostrar el formulario
        titulo: "realTimeProducts",
        rutaJS: "realTimeProducts.js",
        rutaCSS: "form.css",
    })
})


routerHandleBars.get ('/home', async (req,res)=>{
    res.render("home",{
        titulo: "home",
        rutaJS: "home.js",
        rutaCSS: "home.css",
        products : await products.getProducts()
    })
})

routerHandleBars.get('/chat', async(req,res)=>{
    res.render("chat",{
        titutlo:"chat",
        rutaJS:"chat.js",
        rutaCSS:"chat.css"
    })
})


export default routerHandleBars