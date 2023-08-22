import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars'
import {__dirname} from './path.js';

import routerProds from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import routerHandleBars from './routes/views.routes.js';

import { ProductManager } from './controllers/productManager.js';


const PORT = 4000;
const app = express();
const manager = new ProductManager ('src/models/productos.json');
//Server
//Se ubica acá arriba porque Socket io necesita saber la configuración de los servidores
const server = app.listen(PORT,()=>{
    console.log("SERVIDOR FUNCIONANDO EN PUERTO:", PORT);
})
const io = new Server(server); 

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine('handlebars', engine())//Defino que voy a trabajar con handlebars
app.set('view engine', 'handlebars');//Defino extensión
app.set('views', path.resolve(__dirname, './views')) //Defino localización

//Routes
app.use('/static', express.static(path.join(__dirname,'/public')));
app.use ('/api/product', routerProds);
app.use('/api/cart/',cartRouter);
app.use('/static/', routerHandleBars);
app.get('/*',(req,res)=>{   //Ruta con error 404 que se utiliza a nivel general
    res.send("Error 404: Page not found");
})

//Conexión de Socket.io
io.on("connection", (socket)=>{
    console.log("Conexión con Socket.io");
  //Función CHAT/FORMULARIO
    socket.on ('newProduct', async(info) =>{
        const products = await manager.addProduct(info)
       /*  mensajes.push(info);
        console.log(mensajes); */
      io.emit (products);
    })

    socket.on('load', async()=>{
        const products = await manager.getProducts()
        io.emit('products',products);
    })
})




