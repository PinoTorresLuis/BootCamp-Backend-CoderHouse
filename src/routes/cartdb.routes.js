import { Router } from "express";
import {addProduct, createCart, deleteCart, deleteProductCart, findCart, findCarts, purchaseCart, updateProducts, updateQuantity } from "../controllers/cart.controller.js";
import {passportError, authorization } from "../utils/messageErrors.js";

const cartRouterDB = Router(); //Almaceno Router en una variable para poder utilizar las rutas

//Ruta que se utiliza para traer todos los cart que existan
cartRouterDB.get('/', findCarts);

//Ruta que se utiliza para traer un carrito en especifico
cartRouterDB.get('/:cid',findCart);

//Ruta que se utiliza para crear un carrito
cartRouterDB.post('/',passportError('jwt'), authorization('user'), createCart);

//Ruta que se utiliza para aumentar la cantidad
cartRouterDB.post('/:cid/products/:pid', passportError('jwt'), authorization('user'), addProduct);

//Ruta para buscar por cid la cual sirve para acumular productos repetidos por su cantidad o si no existe, agregarlo
cartRouterDB.put('/:cid', passportError('jwt'), authorization('user'), updateProducts);

//Ruta para buscar por CID y PID como indentificares únicos e aumentar la cantidad 
cartRouterDB.put('/:cid/products/:pid',passportError('jwt'), authorization('user'),updateQuantity);

//Ruta para los productos que pueden haber dentro de un carrito por su identificación
cartRouterDB.delete('/:cid', passportError('jwt'), authorization('user'), deleteCart);

//Ruta para borrar dentro de un carrito el producto en especifico
cartRouterDB.delete('/:cid/products/:pid',passportError('jwt'), authorization('user'), deleteProductCart);


cartRouterDB.post('/:cid/purchase', passportError('jwt'), authorization('user'), purchaseCart);

export default cartRouterDB
