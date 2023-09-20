
const login = document.getElementById("loginForm");

login.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const log = Object.fromEntries(formData);
    console.log("Datos a enviar:",log);
    fetch('/api/session/login',{
        method:"POST",
        body:formData
    })
    .then(res=>res.json())
    .then(data=>console.log("Los datos traidos del fetch son:",data))
    Swal.fire(
        'Registro realizado correctamente',
        'success'
    )
    login.reset();
})


