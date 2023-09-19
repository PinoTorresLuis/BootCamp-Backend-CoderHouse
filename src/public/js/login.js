const socket = io();

const login = document.getElementById("loginForm");

login.addEventListener('submit',(e)=>{
    e.preventDefault();
    const datLogin = new FormData(e.target);
    const log = Object.fromEntries(datLogin);
    console.log("Datos a enviar:",log);
    socket.emit('singup',log);
    console.log(log)
    Swal.fire(
        'Registro realizado correctamente',
        'success'
    )
    login.reset();
})


