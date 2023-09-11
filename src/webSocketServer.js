import { Server } from 'socket.io';


const io = new Server();  //Inicio el server

export default function socketConnect (){


//Conexión de Socket.io
io.on("connection", (socket)=>{
    console.log("Conexión con Socket.io OK");
    
    socket.on("message", async data=>{
      const { email, message } = data;
      await messagesModel.create({
        email,message});
      const messages = await messagesModel.find();
      io.emit('messageLogs', messages);
    })

     
/*      Métodos de desafios anteriores
     Método para agregar el producto que proviene del Form
     socket.on ('newProduct', async(info) =>{
        await manager.addProduct(info)
        const products = await manager.getProducts()
      socket.emit ('products',products);
    }) 

   //Método para eliminar productos. Todavía no puedo hacerlo funcionar
  socket.on ('load', async (productId)=>{
        const products = await manager.deleteProduct(productId);
        io.emit( "deleteProduct",products)
    })  */
})

}