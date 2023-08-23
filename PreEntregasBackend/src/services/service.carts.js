import CartsRepository from "../repositories/cart.repository.js";
import ProductsRepository from '../repositories/product.repository.js'

const manager = new ProductsRepository

class CartService {
    constructor() {
        this.carts = new CartsRepository
    }
    //muestra todos los cariitos
    async getCarts() {
        try {
            const data = await this.carts.getCarts();
            return data;
        } catch (error) {
            throw new Error("Se produjo un error al traer todos los carritos");
        }
    }
    //muestra un carrito por su id
    async getCartById(idCart) {
        try {
            const data = await this.carts.getCartById(idCart);
            if (!data) {
                return `No se ha encontrado carritos con este id:(${id}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`;
            }
            return data;
        } catch (error) {
            throw new Error(
                "Se produjo un error al intentar traer el carrito con id: " + idCart
            );
        }
    }
    //crea un carrito
    async addCarts() {
        try {
            const data = await this.carts.getCarts();
            if (data.length >= 0) {
                const newCart = await this.carts.createCart();
                return newCart;
            }
        } catch (error) {
            throw new Error("Se produjo un error al crear el carrito", error);
        }
    }
    //agregar productos al carrito y suma el quantity
    async addProductCart(cartId, productId) {
        try {
            const product = await manager.getProductById(productId);
            if (!product) {
                throw new Error(
                `Se produjo un error al cargar el producto con el id: ${productId}, verifique su existencia`
                );
            }
            let cart = await this.carts.getCartById(cartId);
            if (!cart) {
                throw new Error(
                `El carrito con el id: (${cartId}) no existe, verifique los datos ingresados`
                );
            } else {
                cart = await this.carts.addToCart(cartId, productId);
                await cart.save();
                return cart;
            }
        } catch (error) {
            throw new Error(
                `Se produjo un error al cargar el productos en el carrito con el id: ${idCart}`,
                error.message
            );
        }
    }
    //borra el carrito
    async deleteCart(idCart) {
        try {
            const cart = await this.carts.getCartById(idCart);
            if (!cart) {
                throw new Error(
                `Se produjo un error al eliminar el carrito, verifique su existencia`
                );
            } else {
                const cartDelete = await this.carts.deleteCart(idCart);
                return cartDelete;
            }
        } catch (error) {
            throw new Error(`Error al eliminar el carrito: ${error}`);
        }
    }
    //vacia el carrito
    async emptyCart(idCart){
        try {
            let cart = await this.carts.getCartById(idCart)
            if(!cart){
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingrersados`);
            }else{
                cart = await this.carts.emptyCart(idCart)
                return cart
            }            
        } catch (error) {
            throw new Error(`Se produjo un error al intentar vaciar el carrito con el id: (${idCart}), verifique los datos ingrersados`);
        }
    }
    //actualiza quantity = a 1 y luego lo elimina
    async deleteProductToCart(idCart, idProduct){
        try {
            const cart = await this.carts.getCartById(idCart)
            if(!cart){ 
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingresados`)
            }else{
                const productInCart = cart.products.find(prod => prod.product._id.toString() === idProduct)
                if(!productInCart){
                    throw new Error(`El carrito con el id: (${idCart}) no contiene el producto con el id: (${idProduct}), verifique los datos ingresados`)
                }else{
                    cart = await this.carts.deleteProductInCart(idCart, idProduct)
                    await cart.save()
                    return cart
                }
            }            
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${idProduct}, del carrito: ${idCart}, ${error}`);
        }
    }
    //elimina el producto del carrito
    async deleteProductCart(idCart, idProduct){
        try {
            let cart = await this.carts.getCartById(idCart)
            if(!cart){
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingresados`)
            }else{
                const productInCart = cart.products.find(prod => prod.product._id.toString() === idProduct)
                if(!productInCart){
                    throw new Error(`Se produjo un error al borrar el producto con id: ${idProduct} del carrito con el id: ${idCart}, verifique su existencia`, error);
                }else{
                    cart = await this.carts.removeProductToCart(idCart, idProduct);
                    await cart.save();
                    return cart
                }
            }
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${idProduct}, del carrito: ${idCart}, ${error}`);
        }
    }
    //modifica quantity
    async updateProductInCart(idCart, idProduct, quantity){
        try {
            if(!quantity){
                throw new Error('Quantity no ingresada, es necesario ingresar un valor');
            }
            let cart = await this.carts.getCartById(idCart)
            if(!cart){
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingresados`)
            }else{
                const productInCart = cart.products.find(prod => prod.product._id.toString() === idProduct)
                if(!productInCart){
                    throw new Error(`Se produjo un error al modificar quantity del producto con id: ${idProduct} del carrito con el id: ${idCart}, verifique su existencia`, error);
                }else{
                    cart = await this.carts.updateQuantityOfProductsOnCart(idCart, idProduct, quantity);
                    await cart.save();
                    return cart
                }
            }
        } catch (error) {
            throw new Error(`Error al actualizar quantity el producto: ${idProduct}, del carrito: ${idCart}, ${error}`);
        }
    }
    //inserta array de product en carrito
    async insertArrayProductsIntoCart(idCart, products){
        try {
            if(typeof(products) === Object){
                throw new Error('Se produjo un error al queres agregar products, este debe tener un formato JSON');
            }
            let cart = await this.carts.getCartById(idCart)
            if(!cart){
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingresados`)
            }else{
                cart = await this.carts.addArrayProductsToCart(idCart, products);
                await cart.save();
                return cart                
            }
        } catch (error) {
            throw new Error(`Se produjo un error al insertar los productos en el carrito con el id ${idCart}, verifique los datos ingresados, ${error}`);
        }
    }
}

export default CartService;
