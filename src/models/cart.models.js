import { Schema, model } from "mongoose";

const cartSchema = new Schema ({
    products :[{
        id_prod: {
            type: Schema.Types.ObjectId, //ID autogenerando desde MongoDB
            ref: 'products',
            required: true
        },
        quantity: {
            type:Number,
            required: true //siempre tiene que empezar en default a 1

        }
    }]
})

export const cartModel = model ('carts', cartSchema)
