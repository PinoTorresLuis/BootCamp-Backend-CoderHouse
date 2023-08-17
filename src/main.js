import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars'
import {__dirname} from './path.js';

import routerProds from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';


const PORT = 4000;
const app = express();
//Server
//Esto se hace porque socket io necesita saber la configuración de los servidores
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

//Conexión de Socket.io
io.on("connection", (socket)=>{
    console.log("Conexión con Socket.io");

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
 */

})

//Routes
app.use('/static', express.static(path.join(__dirname,'/public')));
app.use ('/api/product', routerProds);
app.use('/api/cart/',cartRouter);

//HBS
app.get ('/static', (req,res)=>{

    res.render("realTimeProducts",{
        titulo: "RealTimeProducts",
        rutaJS: "realTimeProducts.js",
        rutaCSS: "style.css"
    })


})

  /*
  Código de HBS 
  const user = {
        nombre: "Luis",
        cargo: "Tutor"
    }
    const cursos = [
        {numCurso: "123", dia:"LYM", horario:"Mañana"},        
        {numCurso: "456", dia:"MYJ", horario:"Tarde"},
        {numCurso: "789", dia:"VYS", horario:"Noche"},
    ]

//Indicar que plantilla voy a utilizar
res.render('realt',{
    titulo:"realt",
    usuario: user,
    isTutor: user.cargo === "Tutor",
    cursos:cursos
}) */




app.get('/*',(req,res)=>{   
    res.send("Error 404: Page not found");
})


