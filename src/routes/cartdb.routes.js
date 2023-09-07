import { Router } from "express";

import { cartModel } from "../models/cart.models.js";
import { productModel } from "../models/products.models.js";

const cartRouterDB = Router();

cartRouterDB.get('/:id', async(req,res)=>{
    const {id} = req.params;
    const prods = await cartModel.findOne(id).populate('products.id_prod');
    if (prods){
        res.status(200).send({resultado:"Tu producto en el carrito es:", message:prods})
    }else {
        res.status(404).send({resultado:"No se encontró ningún producto"})
    }
})

cartRouterDB.get('/', async(req,res)=>{
    const prods = await cartModel.find();
    res.status(200).send({resultado:"Productos encontrados", message:prods});
})

cartRouterDB.post('/', async(req,res)=>{
    await cartModel.create();
   
    res.status(200).send({resultado:"Producto agregado al carrito correctamente"})

})


cartRouterDB.post('/:pid/products/:cid', async(req,res)=>{
    const {cid,pid} = req.params
    const {quantity} = req.body
    try {
     const checkIDProduct = await productModel.findById(pid);
     if(!checkIDProduct){
        res.status(404).send({resultado:"No se encontró el ID de Products"})
     }

     const checkIDCart = await productModel.findById(cid);
     if(!checkIDCart){
        res.status(404).send({resultado:"No se encontró el ID en Carrito"})
     }
     const result = await cartModel.insertMany(cid,{_id:pid, quantity:quantity});
     if(result)
     res.status(200).send({resultado:"El producto se agregó correctamente"})

        
    } catch (error) {
        res.status(404).send({resultado:"no se pudo actualizar el carrito", message:error})
    }

})

export default cartRouterDB
