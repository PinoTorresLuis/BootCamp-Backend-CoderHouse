import 'dotenv/config.js'; //Permite utilizar variables de entorno
import mongoose from 'mongoose';
import { logger } from './utils/logger.js';

//Archivo JS donde conecto mi proyecto con MongoDB
export default function mongoConnect(){
mongoose.connect(process.env.MONGO_URL)
.then(async()=>{
  logger.info("DB conectada");
})
.catch((e)=>logger.warning("Error en conexión a MONGO DB Atlas", e));
}

