const socket = io();

const div = document.getElementById("container-products");

socket.emit('load');

socket.on('products', products =>{
    div.innerHTML = '';
    products.forEach(prod =>{
        div.innerHTML += `
        <div class="product-container">
          <p>Id: ${prod.id}</p>
          <p>Title: ${prod.title}</p>
          <p>Description: ${prod.description}</p>
          <p>Price: ${prod.price}</p>
          <p>Code: ${prod.code}</p>
          <p>Stock: ${prod.stock}</p>
        </div>
        `;
    })
})