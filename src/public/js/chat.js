const socket = io();

const btnChat = document.getElementById("botonChat");
const valInput = document.getElementById("chat-box");
const parrafosMensajes = document.getElementById("parrafosMensajes");

let email 

Swal.fire ({
    title:"User email",
    text: "Please enter your email",
    input: "text",
    inputValidator: (valor) =>{
        return !valor && 'Ingrese un email válido'
    },
    allowOutsideClick : false
}).then (resultado =>{
    email = resultado.value
})

btnChat.addEventListener('click', () =>{
        if(valInput.value.trim().length >0){
            socket.emit("message", {
        email:email, 
        message:valInput.value,
        });
        valInput.value = "";
        }
})

socket.on('messageLogs', arrayMensajes=>{
    parrafosMensajes.innerHTML ="";
    arrayMensajes.forEach(messages=>{
        const {email,message} = messages
        parrafosMensajes.innerHTML +=`
        <p>
         ${email} dice: ${message}
        </p>`
    })
    
})

/* 
if (!value) {
    return 'Enter a valid email'
    }
    const emailRegex = " /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i"

    if(!emailRegex.test(campo.value)){
    return "Enter a valid email"
    }
}, */