import { Schema, model } from "mongoose";

const cartSchema = new Schema ({
    products :{
        type:[
            {   
                id_prod:{
                    type: Schema.Types.ObjectId, //ID autogenerando desde MongoDB
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type:Number,
                    required: true //siempre tiene que empezar en default a 1
                }
            }
        ],
            default:function(){
                return []
            }

    }
})

cartSchema.pre('find', function () {
	this.populate('products.id_prod');
});
// por defecto hace un populate en el find

export const cartModel = model ('carts', cartSchema)
