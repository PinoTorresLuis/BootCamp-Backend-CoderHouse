import { Router } from "express";

import { ProductManager } from "../productManager.js";

const routerProd = Router();

const productManager = new ProductManager ('src/models/productos.json');


routerProd.get ('/', async(req,res)=>{
    const {limit} = req.query;
    const productos = await productManager.getProducts();
    const prods = productos.slice(0,limit);
    res.status(200).send(prods);
});

routerProd.get ('/:id', async(req,res)=>{
    const {id} = req.params
    const prods = await productManager.getProductById(parseInt(id));
    if (prods){
        res.status(200).send(prods);
    }else {
        res.status(404).send("Producto no encontrado")
    }
});

routerProd.post ('/', async(req,res)=>{
    const confirmacion = await productManager.addProduct(req.body);
    if(confirmacion){
        res.status(200).send("Producto creado correctamente");
    }else {
        res.status(404).send("Producto ya existente")
    }
});

routerProd.delete ('/:id', async(req,res)=>{
    const confirmacion = await productManager.deleteProducts(req.params.id);
    if(confirmacion){
        res.status(200).send("Producto borrado correctamente");
    }else {
        res.status(400).send("Producto no encontrado")
    }
});
routerProd.put ('/:id',  async(req,res)=>{
    const confirmacion = await productManager.updateProducts(req.params.id, req.body);
    if(confirmacion){
        res.status(200).send("Producto actualizado correctamente");
    }else {
        res.status(404).send("Producto no encontrado")
    }
});

export default routerProd;