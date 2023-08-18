const socket = io ();

const form = document.getElementById("formProduct");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datForm = new FormData (e.target);
    const prod = Object.fromEntries(datForm);
    socket.emit('newProduct',prod);
    console.log(prod)
    Swal.fire(
        'Producto creado correctamente!',
        'success'
      )
    form.reset();
} )