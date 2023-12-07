import 'dotenv/config.js'; //Permite utilizar variables de entorno
import Assert from 'assert'
import mongoose from 'mongoose';
import { logger } from '../src/utils/logger.js';
import { userModel } from '../src/models/users.model.js';
import { getUsers } from '../src/controllers/user.controller.js';

await mongoose.connect(process.env.MONGO_URL)
.then(async()=>{
  logger.info("MONGODB conectada");
})
.catch((e)=>logger.warning("Error en conexión a MONGO DB Atlas", e));

const assert = Assert.strict

describe('Testing Users', ()=>{
    before(async function (){
        //no sé qué iría acá
    })
    beforeEach (function(){
        this.timeout(7000)
    })
    it('Consultar todos los usuarios de lo que sería mi aplicación', async function(){
    const usuarios =  getUsers()
    //Si me devuelve un array => array.isArray = true
    assert.strictEqual(Array.isArray(usuarios), true)
    })
    it('Crear un nuevo usuario', async function(){
        const newUser = {
            first_name: "Luis",
            lastname : "Pino",
            email: "emailtest@testing.com",
            password:"1234"
        }

        const resultado = await userModel.create(newUser)
        assert.ok(resultado._id)
    })

    it('Consultar un usuario dado su email', async function(){
        const email = "emailtest@testing.com"
        const user = await userModel.findOne({email:email})
        assert.strictEqual(typeof user, 'object')
    })
})