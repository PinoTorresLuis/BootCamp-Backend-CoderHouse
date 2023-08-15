import { Router } from "express";

import { ProductManager } from "../controllers/productManager.js";

const routerProds = Router();

const productManager = new ProductManager ('src/models/productos.json');


routerProds.get ('/', async(req,res)=>{
    const {limit} = req.query;
    const products = await productManager.getProducts();
    const prods = products.slice(0,limit);
    res.status(200).send(prods);
});

routerProds.get ('/:id', async(req,res)=>{
    const {id} = req.params
    const prods = await productManager.getProductById(parseInt(id));
    if (prods){
        res.status(200).send(prods);
    }else {
        res.status(404).send("Producto no encontrado")
    }
});

routerProds.post ('/', async(req,res)=>{
    const newProduct = req.body
    await productManager.addProduct(newProduct);
    
    if(newProduct){
        res.status(200).send("Producto creado correctamente");
    }
});

routerProds.put ('/:id',  async(req,res)=>{
    const confirmacion = await productManager.updateProducts(req.params.id, req.body);
    if(confirmacion){
        res.status(200).send("Producto actualizado correctamente");
    }else {
        res.status(404).send("Producto no encontrado")
    }
});

routerProds.delete ('/:id', async(req,res)=>{
    const confirmacion = await productManager.deleteProducts(req.params.id);
    if(confirmacion){
        res.status(200).send("Producto borrado correctamente");
    }else {
        res.status(400).send("Producto no encontrado")
    }
});

export default routerProds;