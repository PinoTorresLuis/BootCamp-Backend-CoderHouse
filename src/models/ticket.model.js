import { Schema,model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const ticketSchema = new Schema({


    quantity:Number,
    code:{
        type:String,
        unique:true,
        default:uuidv4,
    },
    purchaseDateTime:{
        type:Date,
        required:true,
        default:Date.now
    },
    amount:{
        type:Number,
        required:true
    },
    purchaser:{
        type:String,
        required:true
    },
    cart: {
        type:Schema.Types.ObjectId,
        ref:'carts'
    }
});

export const ticketModel = model('ticket', ticketSchema );