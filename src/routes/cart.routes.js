import { Router } from "express";

import { CartProducts } from "../controllers/cart.js";

const cartRouter = Router();

const cartManager = new CartProducts('src/models/cartProducts.json');


cartRouter.post('/',async(req, res) => {
    const confirmacion = await cartManager.addCartProducts(req.body)

    if (confirmacion)
        res.status(200).send("Producto creado correctamente")
    else
        res.status(400).send("Producto ya existente")
})

export default cartRouter;