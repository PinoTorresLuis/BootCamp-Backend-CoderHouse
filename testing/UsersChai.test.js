import 'dotenv/config.js';
import chai from "chai";
import mongoose from "mongoose";
import { logger } from '../src/utils/logger.js';
import { getUsers } from '../src/controllers/user.controller.js';


await mongoose.connect(process.env.MONGO_URL)
.then(async()=>{
    logger.info('DB EN CHAI CONECTADA CORRECTAMENTE ')
})
.catch((e)=>logger.warning("NO SE PUDO CONECTAR LA BD EN CHAI", e))

const expect = chai.expect

describe('Test con Chai para users', ()=>{
    before(async function(){

    })

    beforeEach(function(){
        //Vamos a buscar los datos pero eliminando usuarios
        mongoose.connection.collection.users.drop()
        this.timeout(6000)
    })
    it('Consultar mediante chai a todos los usuarios de mi aplicación', async function(){
        const resultado = await getUsers()
        expect(Array.isArray(resultado).to.be.ok)//Revisar si lo que devuelve el expect es V o F
    })
})