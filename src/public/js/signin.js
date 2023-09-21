const signIn = document.getElementById("singInForm");
signIn.addEventListener("submit", (e)=>{
    e.preventDefault ();
    const formData = new FormData(e.target);
    const login = Object.fromEntries(formData);
    console.log(login)
 /*          Swal.fire(
            "Inicio de sesión correcto",
            "success"
          ); */
          signIn.reset();

})