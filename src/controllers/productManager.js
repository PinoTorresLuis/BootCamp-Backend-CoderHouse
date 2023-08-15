import {promises as fs} from 'fs';

export class ProductManager{
    constructor(path){  //utilizo el path para que funcione como parámetro en mis métodos así al momento de exportar la clase en app.js y al instanciarla poder pasar la ruta del archivo productos.json 
        this.path = path;
    }
    
	addProduct = async (product) => {
		const products = JSON.parse (await fs.readFile(this.path,'utf-8'));
 
    //Código para verificar que no se repita el mismo código de producto
		if (products.some(prod => prod.code === product.code)) {
		  console.log(`ERROR: Ya existe un producto con el código:${product.code}`)
		  return
		  }

    //Código para verificar si la longitud de mi array es igual a 0 , generar id = 1  
    if (products.length === 0){
      product.id = 1;
    } else{
      //si existe, sumarle 1.  No me funcionó con el método incrementID ya que no se incrementaban los ID.
      product.id = products[products.length -1].id + 1;
    } 
  
    if( !product.title || !product.description || !product.price || !product.thumbnail ||! product.code || product.stock < 0){
			console.log("Todos los campos son obligatorios")
			return
		  } else{
			products.push(product) //Se utiliza push para pasar los datos que se encuentran al array vacio en el archivo .txt
		  }
    
		await fs.writeFile(this.path,JSON.stringify(products));
		 
		console.log ("Producto agregado correctamente");
	}

  //Método para traer todos los productos de mi array
	 getProducts= async() => {
		const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
		return products;
	}
  
  //Método para traer el producto que coincida con el ID ingresado
	 getProductById= async(id) => {
		const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
		const findID = products.find(product => product.id == parseInt(id))
    if(findID){
      return findID
    }else {
      console.log("ID no encontrado")
    }

	}
	//Método para actualizar los productos en el archivo .txt
	 updateProducts= async(id, {title, description, price, thumbnail, code, stock })=>{
        const products = JSON.parse (await fs.readFile(this.path, 'utf-8'))
        const index = products.findIndex (prod => prod.id === parseInt(id))

        if (index !== -1){ 
            const product = products[index]
            product.title = title ?? product.title;
            product.description = description ?? product.description;
            product.price = price ?? product.price;
            product.thumbnail = thumbnail ?? product.thumbnail;
            product.code = code ?? product.code;
            product.stock = stock ?? product.stock;
        
            await fs.writeFile(this.path, JSON.stringify(products));
            console.log(`Tu producto se actualizó correctamente!`, JSON.stringify(products[index]))
        }else{
            console.log (`El producto con el ID: ${id} no existe!`)
        }
    }
    //Método para borrar los productos según el ID ingresado
     deleteProduct = async(id)=>{
        const products = JSON.parse (await fs.readFile(this.path,'utf-8'))
        const deleteID = products.filter(prod => prod.id != id)

        await fs.writeFile(this.path, JSON.stringify(deleteID));
         
        console.log ("Producto borrado correctamente");    
      }
}

