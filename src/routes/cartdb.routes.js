import { Router } from "express";

import { cartModel } from "../models/cart.models.js";
import { productModel } from "../models/products.models.js";

const cartRouterDB = Router();

cartRouterDB.get('/', async(req,res)=>{
    const prods = await cartModel.find();
    res.status(200).send({resultado:"Productos encontrados", message:prods});
})

cartRouterDB.get('/:cid', async(req,res)=>{
    const {cid} = req.params;
    const prods = await cartModel.findById(cid)//.populate('products.id_prod');
    if (prods){
        res.status(200).send({resultado:"Tu producto en el carrito es:", message:prods})
    }else {
        res.status(404).send({resultado:"No se encontró ningún producto"})
    }
})


cartRouterDB.post('/', async(req,res)=>{
    try {
        const cart = await cartModel.create({});
        res.status(200).send({resultado:"Agregaste tu carrito",cart})
    } catch (error) {
        res.status(400).send({resultado:"Error al crear el producto",cart})    
    }
})


cartRouterDB.post('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params;

	try {
		const cart = await cartModel.findById(cid);
		const product = await productModel.findById(pid);

		if (!product) {
			res.status(404).send({ resultado: 'Product Not Found', message: product });
			return false;
		}

		if (cart) {
			const productExists = cart.products.find(prod => prod.id_prod == pid);
			if(productExists){
				productExists.quantity++
			} else{
				cart.products.push({ id_prod: product._id, quantity: 1 });
			}
			await cart.save();
			res.status(200).send({ resultado: 'Producto agregado al carrito correctamente', message: cart });
		} else {
			res.status(404).send({ resultado: 'Cart Not Found', message: cart });
		}
	} catch (error) {
		res.status(400).send({ error: `Error al agregar producto: ${error}` });
	}
});


cartRouterDB.put('/:cid', async (req, res) => {
	const { cid } = req.params;
	const updateProducts = req.body;

	try {
		const cart = await cartModel.findById(cid);
		if(!cart){
			res.status(404).send({resultado:"no existe el carrito"})	
			}

		const pid = await productModel.findById(updateProducts.id_prod);
		console.log(pid);
		if(!pid){
		res.status(404).send({resultado:"no existe el producto", mensaje:pid})	
		}

		pid.forEach(prod => {
			const productExists = cart.products.find(cartProd => cartProd.id_prod == prod.id_prod);
			if (productExists) {
				productExists.quantity += prod.quantity;
			} else {
				cart.products.push(prod);
			}
		});
		await cart.save();
		cart
			? res.status(200).send({ resultado: 'OK', message: cart })
			: res.status(404).send({ resultado: 'Not Found', message: cart }); 
	} catch (error) {
		res.status(400).send({ error: `Error al agregar productos: ${error}` });
	}
});


cartRouterDB.put('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params;
	const { quantity } = req.body;

	try {
		const cart = await cartModel.findById(cid);

		if (cart) {
			const productExists = cart.products.find(prod => prod.id_prod == pid);
			if (productExists) {
				productExists.quantity += quantity;
			} else {
				res.status(404).send({ resultado: 'Product Not Found', message: cart });
				
			}
			await cart.save();
			res.status(200).send({ resultado: 'Cantidad aumentada correctamente', message: cart });
		} else {
			res.status(404).send({ resultado: 'Cart Not Found', message: cart });
		}
	} catch (error) {
		res.status(400).send({ error: `Error al agregar productos: ${error}` });
	}
});


cartRouterDB.delete('/:cid', async (req, res) => {
	const { cid } = req.params;
	try {
		const cart = await cartModel.findByIdAndUpdate(cid, { products: [] });
		if(cart){
		res.status(200).send({ resultado: 'El carrito se vació correctamente', message: cart });
		} else {
		 res.status(404).send({ resultado: 'Not Found', message: cart })
		};
	} catch (error) {
		res.status(400).send({ error: `Error al vaciar el carrito: ${error}` });
	}
});

cartRouterDB.delete('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params;

	try {
		const cart = await cartModel.findById(cid);
		if (cart) {
			const productIndex = cart.products.findIndex(prod => prod.id_prod == pid);
			let deletedProduct;
			if (productIndex !== -1) {
				deletedProduct = cart.products[productIndex];
				cart.products.splice(productIndex, 1);
			} else {
				res.status(404).send({ resultado: 'Product Not Found', message: cart });
				return;
			}
			await cart.save();
			res.status(200).send({ resultado: 'OK', message: deletedProduct });
		} else {
			res.status(404).send({ resultado: 'Cart Not Found', message: cart });
		}
	} catch (error) {
		res.status(400).send({ error: `Error al eliminar producto: ${error}` });
	}
});

export default cartRouterDB
