import {promises as fs} from 'fs'

export class CartProducts {
    constructor(path, pathProducts) {
      this.cart = []
      this.path = path
      this.pathProducts = pathProducts
  }

  async agregarCarrito() {
      this.cart = JSON.parse(await fs.readFile(this.path, 'utf-8'))
      const newCart = {}
      if (this.cart.length === 0) {
          newCart.id = 1;
      } else {
          newCart.id = this.cart[this.cart.length - 1].id + 1;
      }
      newCart.products = []
      this.cart.push(newCart)
      await fs.writeFile(this.path, JSON.stringify(this.cart))
  }

  async getProductByCart(cid) {

      this.cart = JSON.parse(await fs.readFile(this.path, 'utf-8'));
      const findID = this.cart.find(cart => cart.id === parseInt(cid))
      if (findID) {
          return findID
      } else {
          return false
      }
  }

  async addProdCart(cid, pid) {
      const prods = JSON.parse(await fs.readFile(this.pathProducts , 'utf-8'))
      const findProductPID = prods.find(product => product.id === parseInt(pid))
      this.cart = JSON.parse(await fs.readFile(this.path, 'utf-8'))
      const findCartCID = this.cart.find(cart => cart.id === parseInt(cid))

      if (!findProductPID) {
          return false
      } else {
          if (!findCartCID) {
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
  }
    /* 

   getCartByID = async()=>{

   }

   updateCartQuantity = async(id)=>{
    const products = JSON.parse(await fs.readFile(this.path,'utf-8'))
    const findIndex = products.findIndex(element => element.id === prod.id);
    if (findIndex !== -1){
      const oldCant = products[findIndex].quantity;
      products[findIndex].quantity = oldCant + element
    } 
   }
   
   
    const findID= this.cart.find(producto => producto.id === prod.id)

    if (prods.some(producto=> producto.id === findID)){
      const index = prods.findIndex(producto =>producto.id === findID);
      prods[index].cantidad ++
    } else {
      prods.push(prod)
    }
      prod.id = CartProducts.incrementID()
     await fs.writeFile(this.path, JSON.stringify(prods))
     return true
    }
   
   
   */


