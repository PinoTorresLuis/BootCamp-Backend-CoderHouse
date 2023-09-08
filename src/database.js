import mongoose from 'mongoose';

//Ruta de OrderModelDB
/* import {orderModel} from '../models/order.models.js'; */

export default function mongoConnect(){
mongoose.connect('mongodb+srv://luispino:coderhouse@clustercoder.rrpt8ts.mongodb.net/?retryWrites=true&w=majority')
.then(async()=>{
  console.log("DB conectada");
  /*await orderModel.create([ 
  const resultados = await orderModel.paginate({size:'medium'}, {limit:1})
  console.log(resultados);
    {name:'Muzza', size:'large',price:10,quantity:5},
    {name:'Peperoni', size:'medium',price:100,quantity:2},
    {name:'Salchi', size:'small',price:400,quantity:4},
    {name:'Jamon crudo', size:'large',price:700,quantity:8},
    {name:'Roquefort', size:'small',price:80,quantity:10},
    {name:'Especial', size:'medium',price:80,quantity:10}, 
  
  const resultados = await orderModel.aggregate([
    {
      $match:{ size:'medium'}
    },
    {
      $group: {_id:"$name", totalQuantity:{$sum:"$quantity"},
    totalPrice : {$sum :"$price"}}
    },
    {
      $sort: {totalPrice: -1} //1 mayor a menor, -1 es para ir de menor a mayor.
    },
    {
      $group : {_id:1, orders:{$push: "$$ROOT"}} //ROOT significa estado actual de la agregación
    },
      {
      $project: { //Genero un nuevo proyecto con los datos previos
      "_id": 0,
      orders:"$orders"
    }
  },
  {
    $merge: {
      into: "reports" //Guardo en la colección en la nube los reportes
    }
  }
  ])
  console.log(resultados);
  ]*/
})

.catch((e)=>console.log("Error en conexión a MONGO DB Atlas", e));
}

