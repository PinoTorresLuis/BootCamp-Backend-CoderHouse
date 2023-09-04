import { Schema, model } from "mongoose";

//Definición de mi esquema de datos
const userSchema = new Schema({
    nombre:String,
    apellido:String,
    edad:Number,
    email: {
        type:String,
        unique: true
    },
    password:String
})

export const userModel = model('users',userSchema)//Defino mi modelo con un nombre y el Schema