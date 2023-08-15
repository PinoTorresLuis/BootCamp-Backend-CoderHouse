import { Router } from "express";

import { CartManager } from "../controllers/cartManager.js";

const cartRouter = Router();

const cartManager = new CartManager('src/models/cartProducts.json','src/models/productos.json');

//Routes
cartRouter.get('/:cid', async (req, res) => {
	const { cid } = req.params;
	const products = await cartManager.getProductByID(parseInt(cid));
	if(products){
		res.status(200).send(products)} 
	else{
		res.status(404).send('Carrito no existente')
	};
});

cartRouter.get('/', async(req,res)=>{
	const {limit} = req.query
	const products = await cartManager.getProducts();
	const prods = products.slice(0,limit)
	res.status(200).send(prods);
})

cartRouter.post('/', async (req, res) => {
	await cartManager.newCart();
	res.status(200).send('Carrito creado correctamente');
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
	const { cid, pid } = req.params;
	const confirmation = await cartManager.addProdCart(parseInt(cid),parseInt(pid));
	if(confirmation){
		res.status(200).send('Producto agregado correctamente');
	}
	else{ 
		res.status(404).send('Carrito o producto inexistente');
	}
});


export default cartRouter;