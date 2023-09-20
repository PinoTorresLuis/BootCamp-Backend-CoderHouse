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


//Ruta del HandleBars para registrarse
routerHandleBars.get('/users/register', async(req,res)=>{
    res.render("signUp",{
        titulo:"Register",
        rutaJS:"singup.js",
    })
})

routerHandleBars.get('/users/signIn', async(req,res)=>{
    res.render("signIn",{
        titulo:"SignIn",
        rutaJS:"signIn.js",
        rutaCSS:"login.css"
    })
})

routerHandleBars.get('/products', (req, res) => {
	res.render('products', {
		rutaCSS: 'products',
		rutaJS: 'products',
	});
});

export default routerHandleBars