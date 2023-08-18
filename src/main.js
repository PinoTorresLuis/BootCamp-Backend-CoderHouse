import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars'
import {__dirname} from './path.js';

import routerProds from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import routerHandleBars from './routes/views.routes.js';

const PORT = 4000;
const app = express();

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
app.use('/', routerHandleBars);
app.get('/*',(req,res)=>{   //Ruta con error 404 que se utiliza a nivel general
    res.send("Error 404: Page not found");
})

//Conexión de Socket.io
const mensajes = [];
io.on("connection", (socket)=>{
    console.log("Conexión con Socket.io");
  //Función CHAT
    socket.on ('mensaje', (info) =>{
        console.log(info);
        mensajes.push(info);
        io.emit ('mensajes', mensajes);
    })
})
 /*
    //Función para Agregar formulario
    socket.on('newProduct',(prod)=>{
        console.log(prod);
        //Debería agregarse al txt mediante addProduct
    } )


  /*   socket.on('mensaje', info =>{
        console.log(info);
        socket.emit('respuesta', false);
    })

    socket.on('juego', (infoJuego)=>{
        if(infoJuego == 'truco'){
            console.log("Conexión a Poker exitosa")
        } else {
            console.log("Conexión a Truco exitosa")
        }
    })
})
*/


