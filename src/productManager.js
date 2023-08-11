import {promises as fs} from 'fs';

export class ProductManager{
    constructor(path){  //utilizo el path para que funcione como parámetro en mis métodos así al momento de exportar la clase en app.js y al instanciarla poder pasar la ruta del archivo productos.json 
        this.path = path;
    }
    static incrementID(){
      if(this.idIncrement){
        this.idIncrement ++
      }else {
        this.idIncrement = 1
      }
      return this.idIncrement
    }
    
	addProduct = async (product) => {
		const products = JSON.parse (await fs.readFile(this.path,'utf-8'));
		  //Código para verificar que no se repita el mismo código de producto
		if (products.some(prod => prod.code === product.code)) {
		  console.log(`ERROR: Ya existe un producto con el código:${product.code}`)
		  return
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

	async getProducts() {
		const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
		return products;
	}

	async getProductById(id) {
		const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
		return products.find(product => product.id == parseInt(id)) ?? console.log('Not Found');
	}
	   //Método para actualizar los productos en el archivo .txt
	async updateProducts(id, {title, description, price, thumbnail, code, stock }){
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
    async deleteProducts(id){
        const products = JSON.parse (await fs.readFile(this.path,'utf-8'))
        const deleteID = products.filter(prod => prod.id != id)

        await fs.writeFile(this.path, JSON.stringify(deleteID));
         
        console.log ("Producto borrado correctamente");    
      }

}

