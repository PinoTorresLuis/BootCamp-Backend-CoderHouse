const signIn = document.getElementById("singInForm");
signIn.addEventListener("submit", (e)=>{
    e.preventDefault ();
    const formData = new FormData(e.target);
    const login = Object.fromEntries(formData);
    console.log(login)
    const requestOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login) // Convertir el objeto a JSON
      };
    
      fetch('/api/session/login', requestOptions)
        .then(res => res.json())
        .then(data => {
          console.log("Los datos del usuario son:", data);
          Swal.fire(
            "Inicio de sesión correcto",
            "success"
          );
          signIn.reset();
        })
        .catch(error => {
          console.error("Error al iniciar sesión:", error);
          // Manejar errores de inicio de sesión
        });
})