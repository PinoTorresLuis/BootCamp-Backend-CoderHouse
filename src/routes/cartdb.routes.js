import { Router } from "express";

import { cartModel } from "../models/cart.models.js";
import { productModel } from "../models/products.models.js";

const cartRouterDB = Router();

cartRouterDB.get('/:id', async(req,res)=>{
    const {id} = req.params;
    const prods = await cartModel.findById(id)//.populate('products.id_prod');
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
    const cart = await cartModel.create({});
    if(cart)
    res.status(200).send({resultado:"Producto agregado al carrito correctamente",cart})

})


cartRouterDB.post('/:cid/products/:pid', async(req,res)=>{
    const {cid,pid} = req.params;
    const {quantity} = req.body;

    try {
     const productID = await productModel.findById(pid);
     if(!productID){
        res.status(404).send({resultado:"No se encontró el ID de Products"})
     }

     const cart = await cartModel.findById(cid);
     if(!cart){
        res.status(404).send({resultado:"No se encontró el ID en Carrito"})
     }

     if(cart){
        cart.products.push({id_prod:pid,quantity:quantity});
        const respuesta = await cartModel.findByIdAndUpdate(cid,cart); //Actualizo mi carrito
        res.status(200).send({respuesta:'OK', message:respuesta})
     }
    } catch (error) {
        res.status(404).send({resultado:"no se pudo actualizar el carrito", message:error})
    }

})

export default cartRouterDB
