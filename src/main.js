import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars'

import {__dirname} from './path.js';
import routerProds from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';

const PORT = 4000;
const app = express();

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
//HBS
app.get ('/static', (req,res)=>{
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
res.render('users',{
    titulo:"Users",
    usuario: user,
    isTutor: user.cargo === "Tutor",
    cursos:cursos
})
})



app.get('/*',(req,res)=>{   
    res.send("Error 404: Page not found");
})

//Server
app.listen(PORT,()=>{
    console.log("SERVIDOR FUNCIONANDO EN PUERTO:", PORT);
})

