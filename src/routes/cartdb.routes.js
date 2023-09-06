import { Router } from "express";

import { cartModel } from "../models/cart.models.js";

import { productModel } from "../models/products.models.js";

const cartRouterDB = Router();

cartRouterDB.get('/:cid', async(req,res)=>{
    const {cid} = req.params;
    const prods = await cartModel.findById(cid);
    if (prods){
        res.status(200).send({resultado:"Tu producto en el carrito es:", message:prods})
    }else {
        res.status(404).send({resultado:"No se encontró ningún producto"})
    }
})

cartRouterDB.get('/', async(req,res)=>{
    const {limit} = req.query;
    const prods = await cartModel.find().limit(limit);
    res.status(200).send({resultado:"Productos encontrados", message:prods});
})

cartRouterDB.post('/', async(req,res)=>{
    try {
     const succes = await cartModel.create();
      res.status(200).send({respuesta:'Producto creado correctamente', message:succes})  
    } catch (error) {
        res.status(404).send({respuesta:"No se pudo crear el producto", message:error})
    }

})


cartRouterDB.post('/:cid/products/:pid', async(req,res)=>{
    const {cid,pid} = req.params;
    const {quantity} = req.body
    try {
     const cart = await productModel.findById(cid);
     if(cart){
        cart.products.push({_id:pid,quantity:quantity})
        const result = await cartModel.findByIdAndUpdate(cid,cart);
        res.status(200).send({resultado:"El producto se agregó correctamente", message:result})
     }
    } catch (error) {
        res.status(404).send({resultado:"no se pudo actualizar el carrito"})
    }

})

export default cartRouterDB
