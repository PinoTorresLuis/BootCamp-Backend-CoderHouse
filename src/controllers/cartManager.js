import {promises as fs} from 'fs'

export class CartManager {
    constructor(path, pathProducts) {
      this.cart = []
      this.path = path
      this.pathProducts = pathProducts
  }
  
  //Método para crear carrito
  newCart = async()=>{
      this.cart = JSON.parse(await fs.readFile(this.path, 'utf-8'));

      const newCart = {}
      //Misma lógica que en ProductManager.
      if (this.cart.length === 0) {
          newCart.id = 1;
      } else {
          newCart.id = this.cart[this.cart.length - 1].id + 1;
      }
      newCart.products = []
      this.cart.push(newCart)
      await fs.writeFile(this.path, JSON.stringify(this.cart))
  }

  //Método para traer todos los productos
  getProducts = async()=>{
    this.cart = JSON.parse(await fs.readFile(this.path,'utf-8'));
    return this.cart
  }

  //Método para traer el producto por el ID
  getProductByID = async(cid)=>{

      this.cart = JSON.parse(await fs.readFile(this.path, 'utf-8'));
      const findID = this.cart.find(cart => cart.id === parseInt(cid))
      if (findID) {
          return findID
      } else {
          return false
      }
  }

  //Método para agregar productos al carrito
  addProdCart = async(cid, pid)=> {
      const prods = JSON.parse(await fs.readFile(this.pathProducts , 'utf-8'))
      const findProductPID = prods.find(product => product.id === parseInt(pid))
      this.cart = JSON.parse(await fs.readFile(this.path, 'utf-8'))
      const findCartCID = this.cart.find(cart => cart.id === parseInt(cid))

      if (!findProductPID || !findCartCID) {
          return false
          } else {
              const productExist = findCartCID.products.find(products => products.id === parseInt(pid))
              if (productExist) { //Indico que el producto ya existe
                  productExist.cantidad++
              } else {
                  const newProduct = {}
                  newProduct.cantidad = 1
                  newProduct.id = findProductPID.id
                  findCartCID.products.push(newProduct)
              }
              await fs.writeFile(this.path, JSON.stringify(this.cart))
              return true
          }

      }
}


