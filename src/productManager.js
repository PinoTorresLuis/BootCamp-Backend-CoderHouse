import {promises as fs} from 'fs';

export class ProductManager{
    constructor(path){  //utilizo el path para que funcione como parámetro en mis métodos así al momento de exportar la clase en app.js y al instanciarla poder pasar la ruta del archivo productos.json 
        this.path = path;
    }

	async getProducts() {
		const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
		return products;
	}

	async getProductById(id) {
		const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
		return products.find(product => product.id == parseInt(id)) ?? console.log('Not Found');
	}
	
}


