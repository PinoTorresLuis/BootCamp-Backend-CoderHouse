import express from 'express';
import path from 'path';

import {__dirname} from './path.js';
import routerProds from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';

const PORT = 4000;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use('/static', express.static(path.join(__dirname,'/public')));
app.use ('/api/product', routerProds);
app.use('/api/cart/',cartRouter);


app.get('/',(req,res)=>{
    res.send("Bienvenido a la página inicial")
})


app.get('/*',(req,res)=>{   
    res.send("Error 404: Page not found");
})

//Server
app.listen(PORT,()=>{
    console.log("SERVIDOR FUNCIONANDO EN PUERTO:", PORT);
})

