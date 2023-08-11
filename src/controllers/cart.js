import {promises as fs} from 'fs'

export class CartProducts {
    constructor(path){
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
   

  addCartProducts = async(prod) =>{
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));

    const findID= prods.find(producto => producto.id === prod.id)

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


   }*/


