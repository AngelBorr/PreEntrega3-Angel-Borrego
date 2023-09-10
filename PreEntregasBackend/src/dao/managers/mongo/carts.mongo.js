import cartsModel from "../../models/carts.models.js";
import ProductsManager from "./products.mongo.js";

const manager = new ProductsManager

class CartsManager{
    cartsModel;
    constructor(){
        this.cartsModel = cartsModel
    }

    //trae a todos los carritos
    getCarts(){
        const data = this.cartsModel.find()
        return data
    }

    //trae un carrito por su id
    getCartById(id){
        const mongoId = {_id:id}
        const data = this.cartsModel.findOne(mongoId).lean()
        return data
    }

    //crea un carrito
    createCart(){
        const newCart = {
            products: []
        }
        const addCart = this.cartsModel.create(newCart)
        return addCart
    }

    //agrega productos al carrito y suma el quantity
    async addToCart (cartId, productId){
        try {
            const idMongoProduct = {_id:productId}
            const idMongoCart = {_id:cartId}
            const product = await manager.getProductById(idMongoProduct);            
            const cart = await this.cartsModel.findOne(idMongoCart);            
            const productInCart = cart.products.find(prod => prod.product._id.toString() === productId);
            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }            
            return cart
        } catch (error) {
            console.log(error)            
        }
        
    }

    //borra el carrito
    deleteCart(idCart){
        const mongoId = {_id:idCart}
        const data = this.cartsModel.deleteOne(mongoId);
        return data
    }

    //vacia el carrito
    async emptyCart(idCart){
        const mongoId = {_id:idCart};
        const cart = await this.cartsModel.findOne(mongoId);
        if(cart){
            cart.products = [];
            await cart.save()
            return cart            
        }
    }

    //actualiza quantity = a 1 y luego lo elimina
    deleteProductInCart(idCart, idProduct){
        const cart = this.cartsModel.findOne({id_:idCart});
        const productInCart = cart.products.find(prod => prod.product._id.toString() === idProduct)
        if(!productInCart){
            throw new Error(`Se produjo un error al borrar el producto con id: ${idProduct} del carrito con el id: ${idCart}, verifique su existencia`, error);
        }else{
            if(productInCart.quantity > 1){
                productInCart.quantity -= 1                        
            }else{
                cart.products = cart.products.filter((prod) => prod.product._id.toString() !== idProduct);
            }                    
        }
        cart.save();
        return cart
    }

    //elimina el producto del carrito
    async removeProductToCart (idCart, idProduct){
        const cart = await this.cartsModel.findOne({_id:idCart})
        const productInCart = cart.products.find(prod => prod.product._id.toString() === idProduct)
        if(productInCart){                    
            cart.products = cart.products.filter((prod) => prod.product._id.toString() !== idProduct);
            await cart.save()
            return cart
        }
        
    }

    //modifica quantity de los productos
    async updateQuantityOfProductsOnCart(idCart, idProduct, quantity){
        const cart = await this.cartsModel.findOne({_id:idCart});
        const productInCart = cart.products.find(prod => prod.product._id.toString() === idProduct)
        if(productInCart.quantity !== quantity){
            productInCart.quantity = quantity                      
        }
        await cart.save()
        return cart
    }

    //agrega un array de productos al carrito
    async addArrayProductsToCart(idCart, products){
        const cart = await this.cartsModel.findOne({_id:idCart})
        if(cart){
            const updateProductCart = [];
            const productsAddCart = [];
            //saco cada product del carrito por id
            const productsInCart = cart.products.map((prod) => prod.product._id.toString());

            for(const data of products){
                //tomo los id y las quantity de los products
                const quantity = data.quantity;
                const idProduct = data.product._id
                    
                //traigo los products con el id
                const product = await manager.getProductById(idProduct)

                if (!product) {
                    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct}, verifique su existencia`);
                }else{
                    const productExistenInCart = cart.products.find(prod => prod.product._id.toString() === idProduct);

                    if (productExistenInCart) {
                        productExistenInCart.quantity += quantity;
                        updateProductCart.push(productExistenInCart)
                    } else {
                        productsAddCart.push({ product: product, quantity: quantity });
                    }
                }
            }

            cart.products.push(...productsAddCart)

            for(const product of updateProductCart){
                await product.save()
            }
            await cart.save()
            return cart
        }
    }

}

export default CartsManager