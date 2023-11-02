import { Schema,model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketSchema = new Schema({
    code:{
        type:String,
        default: uuidv4(),
        required:true,
    },
    purchaseDateTime:{
        type:Date,
        required:true,
        default:Date.now
    },
    amount:{
        type:Number,
        required:true,
    },
    purchaser:{
        type:String,
    }

});


export const ticketModel = model('ticket', ticketSchema );