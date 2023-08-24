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


 routerHandleBars.post('/realtimeproducts', async (req,res)=>{
    try {
        const newProduct = req.body;
        
        // Agregar el producto utilizando el ProductManager
        await products.addProduct(newProduct);
        
        res.status(201).send({ message: 'Producto creado correctamente' });
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).send({ message: 'Error al crear el producto' });
    }
}) 

routerHandleBars.get ('/home', async (req,res)=>{
    res.render("home",{
        titulo: "home",
        rutaJS: "home.js",
        rutaCSS: "home.css",
        products : await products.getProducts()
    })
})

export default routerHandleBars