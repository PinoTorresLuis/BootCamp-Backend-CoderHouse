import express from 'express';
import path from 'path';
import multer from 'multer';

import {__dirname} from './path.js';
import routerProd from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';

const PORT = 4000;
const app = express();
// const USERS = "src/users.json"; //esto es de la clase que vimos postman donde creaba usuarios


//Config
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{ //cb=callback
        cb(null,'src/public/img')//null hace referencia a que no envio errores
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}${file.originalname}`)//concateno la fecha actual con el nombre del archivo
    }
})

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const upload = multer({storage:storage});

//Routes
app.use('/static', express.static(path.join(__dirname,'/public')));
app.use ('/api/product', routerProd);
app.use('/api/cart/',cartRouter);

app.post ('/upload', upload.single('product'),(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    res.status(200).send("imagen cargada");
})


app.get('/',(req,resp)=>{
    resp.send("Bienvenido a la página inicial")
})


app.get('/*',(req,resp)=>{   
    resp.send("Error 404: Page not found");
})

//Server
app.listen(PORT,()=>{
    console.log("SERVIDOR FUNCIONANDO EN PUERTO:", PORT);
})



/* 
app.put ('/users', async(req,res)=>{
    const {nombre,apellido,email,password} = req.body;
    const users = JSON.parse(await fs.readFile(USERS, 'utf-8'));
    const user = users.find(user => user.email === email);

    user ? res.status(400).send("Usuario ya existente")
    :
    users.push({nombre,apellido,email,password});
    await fs.writeFile(USERS, JSON.stringify(users));
    res.status(200).send("Usuario creado");
})
*/