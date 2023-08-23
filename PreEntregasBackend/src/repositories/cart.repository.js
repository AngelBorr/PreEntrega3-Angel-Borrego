import DaosFactory from "../dao/factory.js";

const cartManager = new DaosFactory
const carts = cartManager.cartsDao()

class CartsRepository{    
    constructor(){}

    async getCarts(){        
        const data = await carts.getCarts()
        return data
    }

    async getCartById(id){
        const cart = await carts.getCartById(id);                       
        return cart
    }

    async createCart(){
        const newCart = await carts.createCart()
        return newCart
    }

    async addToCart(cartId, productId){
        const productInCart = await carts.addToCart(cartId, productId)
        return productInCart
    }
    
    async deleteCart(id){
        const result = await carts.deleteCart(id)
        return result
    }

    async emptyCart(id){
        const result = await carts.emptyCart(id)
        return result
    }

    async deleteProductInCart(idCart, idProduct){
        const deleteProductCart = await carts.deleteProductInCart(idCart, idProduct);
        return deleteProductCart
    }

    async removeProductToCart (idCart, idProduct){
        const removeProduct = await carts.removeProductToCart(idCart, idProduct);
        return removeProduct
    }

    async updateQuantityOfProductsOnCart(idCart, idProduct, quantity){
        const quantityProduct = await carts.updateQuantityOfProductsOnCart(idCart, idProduct, quantity);
        return quantityProduct
    }

    async addArrayProductsToCart(idCart, products){
        const cart = await carts.addArrayProductsToCart(idCart, products);
        return cart;
    }
}

export default CartsRepository