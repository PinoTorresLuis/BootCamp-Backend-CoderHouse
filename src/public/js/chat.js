const socket = io();

const btnChat = document.getElementById("botonChat");
const msjChat = document.getElementById("chat-box");
const parrafosMensajes = document.getElementById("parrafosMensajes");

let user 

Swal.fire ({
    title:"Identificación de usuario",
    text: "Por favor ingrese su nombre de usuario",
    input: "text",
    inputValidator: (valor) =>{
        return !valor && 'Ingrese un nombre válido'
    },
    allowOutsideClick : false
}).then (resultado =>{
    user = resultado.value
    console.log(user)
})

btnChat.addEventListener('click', ()=>{
    let fechaActual = new Date().toLocaleString();
    if(msjChat.value.trim().length > 0){ //evitar que me envien datos vacíos
        socket.emit('mensaje', {fecha:fechaActual,user:user, mensaje:msjChat.value})
        msjChat.value = "" //Limpio el input
    }
})

socket.on("mensajes", arrayMensajes =>{
    
})


