const socket = io();

const containerProducts = document.getElementById("container-products");

socket.emit('load');

socket.on('products', products =>{
    containerProducts.innerHTML = "";

    products.forEach(prod =>{
       const div = document.createElement("div");
       div.classList.add("product");
       div.innerHTML =`
          <p>Id: ${prod.id}</p>
          <p>Title: ${prod.title}</p>
          <p>Description: ${prod.description}</p>
          <p>Price: ${prod.price}</p>
          <p>Code: ${prod.code}</p>
          <p>Stock: ${prod.stock}</p>
          <button id="${prod.id}" class="btn-delete">Eliminar</button>
        `;
      containerProducts.append(div);
    })
})

//Cree el botón Eliminar pero todavía no funciona

