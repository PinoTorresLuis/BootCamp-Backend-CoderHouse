import { Router } from "express";
import { productModel } from "../models/products.models.js";

const productRouter = Router();

productRouter.get('/', async(req,res)=>{
    const {limit} = req.query
    try {
        const prods = await productModel.paginate({title:"Ñoqui"},{limit:limit});
        console.log(prods);
        res.status(200).send({resultado:'Solicitud de productos correcta', message:prods})
    } catch (e) {
        res.status(400).send({e:'Error al consultar los productos',e});
    }
})

productRouter.get('/:id', async(req,res)=>{
    const {id} = req.params
    try {
        const prod = await productModel.findById(id);
        if(prod){
        res.status(200).send({resultado:'Producto encontrado correctamente', message:prod})
        }else {
        res.status(404).send({resultado:"Not Found", message:prod})
        }
    } catch (e) {
        res.status(400).send({e:'Error al consultar los productos',e});
    }
})

productRouter.post('/', async(req,res)=>{
    const {title,description,stock,code,category,price} = req.body
    try {
        const succes = await productModel.create({
            title,description,stock,code,category,price
        });
        if(succes){
        res.status(200).send({resultado:'Producto enviado correctamente', message:succes})
        }
    } catch (e) {
        res.status(400).send({e:"Todos los campos son obligatorios",e});
    }
})

productRouter.put('/:id', async(req,res)=>{
    const {id} = req.params
    const {title,description,stock,code,category,price,status} = req.body
    try {
        const succes = await productModel.findByIdAndUpdate(id,{
            title,description,stock,code,category,price
        });
        if(succes){
        res.status(200).send({resultado:'Producto actualizado correctamente', message:succes})
        }else{
            res.status(404).send({e:'Not Found-Update', message:succes});
        }
    } catch (e) {
        res.status(400).send({e:'Error al actualizar el producto',e});
    }
})

productRouter.delete('/:id', async(req,res)=>{
    const {id} = req.params
    try {
        const succes = await productModel.findByIdAndDelete(id);
        if(succes){
        res.status(200).send({resultado:'Producto borrado correctamente', message:succes})
        }else{
            res.status(404).send({e:'Not found', message:succes});
        }
    } catch (e) {
        res.status(400).send({e:'Error al eliminar el producto',e});
    }
})



export default productRouter;