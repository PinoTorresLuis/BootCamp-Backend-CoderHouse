import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
//Import del SV Mongo 
import mongoConnect from './database.js';

//import FileStore  from "session-file-store";

import MongoStore from 'connect-mongo';
import path from 'path';
import {__dirname} from './path.js';

import { Server } from 'socket.io';
import { engine } from 'express-handlebars'

/*   <---- Importaciones de rutas que ya no se están usando ---->
import routerProds from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';

     <---- Ruta de UsuarioDB ---->
import userRouter from './routes/users.routes.js'; 
     <---- Ruta de ProductManager ---->
import { ProductManager } from './controllers/productManager.js';
const manager = new ProductManager ('src/models/productos.json');*/

//Ruta de HandleBars
import routerHandleBars from './routes/views.routes.js';
//Ruta de ProductsDB
import productRouter from './routes/productsdb.routes.js';
//Ruta de CartProductsDB
import cartRouterDB from './routes/cartdb.routes.js';
//Ruta de MessagesDB
import { messagesModel } from './models/messages.models.js';
//Ruta de Cookies
import cookiesRouter from './routes/cookie.routes.js';
//Ruta de Sesiones
import sessionRouter from './routes/sessions.routes.js';
//Ruta de Usuarios
import userRouter from './routes/users.routes.js';


const PORT = 4000; //Almaceno en el puerto que voy a trabajar
const app = express(); //Inicio el servidor Express
//Inicio mi servidor MongoDB
//const fileStorage = FileStore(session); //Guardo la sesión express en FileStorae

mongoConnect();

//Server
const server = app.listen(PORT,()=>{
    console.log("SERVIDOR FUNCIONANDO EN PUERTO:", PORT);
})
//Se ubica acá arriba apropósito porque Socket io necesita saber la configuración de los servidores
const io = new Server(server);  //Inicio el server WebSocket

//Middlewares
app.use(express.json()); //Se utiliza para que mis rutas puedan leer archivos json
app.use(express.urlencoded({extended:true})); //Se utiliza para optimizar la búsqueda en las rutas
app.engine('handlebars', engine())//Defino que voy a trabajar con handlebars
app.set('view engine', 'handlebars');//Defino extensión
app.set('views', path.resolve(__dirname, './views')) //Defino localización
app.use(cookieParser(process.env.SIGNED_COOKIE)); //Cookie Parser
//Configuración de la sesión de mi Usuario en mi APP
app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    mongoOptions: {useNewUrlParser: true,useUnifiedTopology:true},
    ttl:90//Va a durar segundos
  }),
 // store : new fileStorage({path: './sessions',ttl:10000, retries:1}),
  secret:process.env.SESSION_SECRET,
  resave:true,
  saveUninitialized:true
}))



//Routes
app.use('/static', express.static(path.join(__dirname,'/public')));

//Rutas que ya no se están usando
//app.use ('/api/products', routerProds);
//app.use('/api/carts/',cartRouter);
//app.use('/api/users', userRouter);

app.use('/static/', routerHandleBars);
app.use('/api/products', productRouter);
app.use('/api/carts',cartRouterDB);
app.use('/cookies', cookiesRouter);
app.use('/api/session', sessionRouter);
app.use('/users', userRouter);
app.get('/*',(req,res)=>{   //Ruta con error 404 que se utiliza a nivel general
    res.send("Error 404: Page not found");
})

//Conexión de Socket.io
io.on("connection", (socket)=>{
    console.log("Conexión con Socket.io OK");
    
    //Método para agregar los mensajes a la base de datos
    socket.on("message", async data=>{
      const { email, message } = data;
      await messagesModel.create({
        email,message});
      const messages = await messagesModel.find();
      io.emit('messageLogs', messages);
    })

  /*  //Método para agregar el producto que proviene del Form
    socket.on ('newProduct', async(info) =>{
       await manager.addProduct(info)
       const products = await manager.getProducts()
     socket.emit ('products',products);
   }) 

   socket.on('singup', async(data)=>{
    const {first_name,lastname,age,email,password} = data;
    await userModel.create({
      first_name,lastname,age,email,password
    })
    console.log(data);
   } ) */

   socket.on('load', async () => {
		const data = await productModel.paginate({}, { limit: 5 });
		socket.emit('products', data);
	});

	socket.on('previousPage', async page => {
		const data = await productModel.paginate({}, { limit: 5, page: page });
		socket.emit('products', data);
	});

	socket.on('nextPage', async page => {
		const data = await productModel.paginate({}, { limit: 5, page: page });
		socket.emit('products', data);
	});
})



