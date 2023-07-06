import cartsModel from './models/carts.models.js'
import ProductManager from './productsManager.js';

const manager = new ProductManager

class CartsManager{
    cartsModel;
    constructor(){
        this.cartsModel = cartsModel
    }

    async getCarts() {
        const getdata = async () =>{
            try {
                const data = await this.cartsModel.find({})
                return data
            } catch (error) {
                console.log(error.message)
            }            
        }        
        return getdata;             
    }

    async getCartById(id){
        try {
            const data = await this.cartsModel.findOne({_id:id});            
            if(!data){
                return `No se ha encontrado carritos con este id:(${id}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`;
            }
            return data;
        } catch (error) {
            throw new Error('Se produjo un error al leer los datos desde el Json')
        }
    }

    async addCarts(){
        try {
            const data = await this.cartsModel.find({});
            if(data.length >= 0){
                try {
                    const newCart = {
                        products : []
                    }
                    const addCart = this.cartsModel.create(newCart)
                    return addCart
                } catch (error) {
                    throw new Error('Se produjo un error al crear el carrito', error);
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async addProductsCart(idCart, idProduct){
        try {
            const cart = await this.cartsModel.findOne({_id:idCart});
            if (!cart) {
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingrersados`);
            }
            const product = await manager.getProductById(idProduct);
            if (!product) {
                throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct}, verifique su existencia`);
            }
            const productInCart = cart.products.find(prod => prod.product.toString() === idProduct);
            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                cart.products.push({ product: idProduct, quantity: 1 });
            }
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Se produjo un error al cargar el carrito con el id: ${idCart}`, error.message);
        }
    }

    async deleteCart(idCart){
        try {
            const cartDelete = await this.cartsModel.deleteOne({_id:idCart})
            return cartDelete
        } catch (error) {
            throw new Error(`Error al eliminar el carrito: ${error}`);
        }
    }

    async deleteProductInCart (idCart, idProduct){
        try {            
            const cart = await this.cartsModel.findOne({_id:idCart})
            if(!cart){
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingrersados`);
            }else{
                const productInCart = cart.products.find(prod => prod.product.toString() === idProduct)
                if(!productInCart){
                    throw new Error(`Se produjo un error al borrar el producto con id: ${idProduct} del carrito con el id: ${idCart}, verifique su existencia`, error);
                }else{
                    if(productInCart.quantity > 1){
                        productInCart.quantity -= 1                        
                    }else{
                        cart.products = cart.products.filter((prod) => prod.product.toString() !== idProduct);
                    }                    
                }                
            }
            await cart.save()
            return cart
        } catch (error) {
            
        }
    }
}

export default CartsManager

