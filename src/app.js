import express from 'express';
import {ProductManager} from './productManager.js';

const app = express();
const PORT = 4000;
const manager = new ProductManager('src/productos.json');

app.use(express.urlencoded({extended:true}));


app.get('/',(req,resp)=>{
    resp.send("Bienvenido a la página inicial")
})

app.get('/productos/:id', async(req,resp)=>{
    const idUsuario = req.params.id;
    const findId = await manager.getProductById(idUsuario);
    if (findId){
        resp.send (findId)
    } else {
        resp.send(`ID: ${idUsuario} NO EXISTE`);
    }

})

app.get('/productos',async(req,resp)=>{
    const {limit} = req.query;
    const products = await manager.getProducts();
    if(limit){
        resp.send(products.slice(0,limit))
    }else {
        resp.send(products)
    }
})

app.get('/*',(req,resp)=>{   
    resp.send("Error 404: Page not found");
})

app.listen(PORT,()=>{
    console.log("SERVIDOR FUNCIONANDO EN PUERTO:", PORT);
})