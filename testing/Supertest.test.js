import 'dotenv/config.js';
import chai from chai;
import supertest from "supertest";
import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest('http://localhost:8000')

await mongoose.connect(process.env.MONGO_URL)
.then(async()=>{
  logger.info("MONGODB conectada");
})
.catch((e)=>logger.warning("Error en conexión a MONGO DB Atlas", e));

let idPet

describe('Testing Aplicación de varios modelos/elementos/endpoints',()=>{
    describe('Test de usuarios',()=>{ //Tengo qué marcar donde apunto y decir qué es lo que espero de esto
        it('Test endpoint /api/users, se espera que se genere un producto', async function(){
            const newProduct = {
                title:'procesador',
                description:'amd',
                price:300000,
                stock:10,
                category:'gamer',
                status:'true',
                code:'a1a1',
                thumbnails:[]
            }
        const {status,ok,_body} = await requester.post('/api/products').send(newProduct)
        console.log(status);
        console.log(ok);
        idPet = _body.payload._id;
        })
           it('Test endpoint /api/users, se espera que se actualice un producto', async function(){
        console.log(idPet)
        const updatePet = {
            title:'procesador AMD',
            description:'amd5',
            price:350000,
            stock:5,
            category:'gamer',
        }
        const {_body} = await requester.put(`/api/products/${idPet}`).send(updatePet)
        console.log(_body);
        })
        
        it('Test endpoint /api/users, se espera que devuelva un producto', async function(){
            const {_body} = await requester.get(`/api/products/${idPet}`)
            console.log(_body);
        })
    
        it('Test endpoint /api/users, se espera que se elimine un producto', async function(){
            const {_body} = await requester.delete(`/api/products/${idPet}`)
            console.log(_body);
        }) 
    })
})