import cartsModel from '../dao/models/carts.models.js'
import ProductManager from '../dao/productsManager.js';

const manager = new ProductManager

class CartsManager{
    cartsModel;
    constructor(){
        this.cartsModel = cartsModel
    }
    //trae todos los carritos
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
    //trae el carrito por su id
    async getCartById(id){
        try {
            const data = await this.cartsModel.findOne({_id:id}).lean();            
            if(!data){
                return `No se ha encontrado carritos con este id:(${id}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`;
            }
            return data;
        } catch (error) {
            throw new Error('Se produjo un error al leer los datos desde el Json')
        }
    }
    //este metodo crea un carrito
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
    //este metodo agrega productos al carrito y suma el quantity de los products
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
    //este metodo borra el carrito
    async deleteCart(idCart){
        try {
            const cartDelete = await this.cartsModel.deleteOne({_id:idCart})
            return cartDelete
        } catch (error) {
            throw new Error(`Error al eliminar el carrito: ${error}`);
        }
    }
    //este metodo vacia el carrito
    async emptyCart (idCart){
        try {
            const cart = await this.cartsModel.findOne({_id:idCart})
            if(!cart){
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingrersados`);
            }else{
                cart.products = []
            }
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(`Se produjo un error al intentar vaciar el carrito con el id: (${idCart}), verifique los datos ingrersados`);
        }
    }
    // este metodo actualiza quantity hasta que sea = a 1 y luego lo elimina
    async deleteProductInCart (idCart, idProduct){
        try {            
            const cart = await this.cartsModel.findOne({_id:idCart})

            if(!cart){
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingrersados`);
            }else{
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
            }
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${idProduct}, del carrito: ${idCart}, ${error}`);
        }
    }
    //este metodo elimina directamente el product del cart
    async deleteProductCart(idCart, idProduct){
        try {
            const cart = await this.cartsModel.findOne({_id:idCart})

            if(!cart){
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingrersados`);
            }else{
                const productInCart = cart.products.find(prod => prod.product._id.toString() === idProduct)

                if(!productInCart){
                    throw new Error(`Se produjo un error al borrar el producto con id: ${idProduct} del carrito con el id: ${idCart}, verifique su existencia`, error);
                }else{                    
                    cart.products = cart.products.filter((prod) => prod.product._id.toString() !== idProduct);
                }                
            }
            await cart.save()
            return cart            
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${idProduct}, del carrito: ${idCart}, ${error}`);
        }
    }
    //este metodo solamente modifica quantity de los products
    async updateProductInCart (idCart, idProduct, quantity){
        try {
            if(!quantity){
                throw new Error('Quantity no ingresada, es necesario ingresar un valor');
            }
            
            const cart = await this.cartsModel.findOne({_id:idCart})

            if(!cart){
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingrersados`);
            }else{
                const productInCart = cart.products.find(prod => prod.product._id.toString() === idProduct)
                
                if(!productInCart){
                    throw new Error(`Se produjo un error al borrar el producto con id: ${idProduct} del carrito con el id: ${idCart}, verifique su existencia`, error);
                }else if(productInCart.quantity !== quantity){
                    productInCart.quantity = quantity                      
                }                               
            }
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(`Error al actualizar quantity el producto: ${idProduct}, del carrito: ${idCart}, ${error}`);
        }
    }
    //este metodo toma un array de products y lo inserta en un carrito
    async addProductsInCartExisten(idCart, products){
        try {
            const cart = await this.cartsModel.findOne({_id:idCart})

            if(!cart){
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingrersados`);
            }else{
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
        } catch (error) {
            throw new Error(`Se produjo un error al insertar o actualizar el o los productos en el carrito con el id ${idCart}, verifique los datos ingresados, ${error}`);
        }
    }
}

export default CartsManager

