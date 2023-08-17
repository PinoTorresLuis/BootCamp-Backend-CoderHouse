const socket = io();

//emit es un método de Socket.io
socket.emit('mensaje',"Hola servidor");//1ro va el identificador de mensaje y 2do son los argumentos, o sea qué le voy a enviar

socket.on('respuesta', (info)=>{
    if (info) {
        socket.emit('juego', 'poker')
    } else {
        console.log("Error en conexión")
    }
})