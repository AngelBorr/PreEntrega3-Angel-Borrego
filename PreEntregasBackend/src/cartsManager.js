import fs from 'fs';
import ProductManager from "./productsManager.js";

const manager = new ProductManager

export default class CartsManager{
    constructor(){
        this.productsCarts = [];
        this.pathCarts = './assets/carts.json';
        
    }

    async getProductsCarts(){
        const getData = async () => {
            try {
                const data = await fs.promises.readFile(this.pathCarts, 'utf8');
                return JSON.parse(data)
            } catch (error) {
                try {
                    await fs.promises.writeFile(this.pathCarts, '[]');
                    return []
                } catch (error) {
                    throw new Error('Se produjo un error al mostrar los en el carrito');
                }
                
            }
        }
        try {
            return await getData();
        } catch (error_2) {
            throw error_2;
        }
    }

    generateIdCarts(){
        let id = this.productsCarts.length > 0 ? this.productsCarts[this.productsCarts.length - 1].id + 1 : 1;
        return id;
    }

    async addCarts(){
        try {
            //verifico si ya existen carritos en this.productsCarts sino lo creamos
            const data = await this.getProductsCarts();            
            //paso id de carts y recorro this.productsCarts
            console.log(data);
            if(data.length >= 0){
                try {
                    const newCarts = {
                        id: this.generateIdCarts(),
                        products: []                    
                    }                    
                    this.productsCarts.push(newCarts);
                    await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.productsCarts), 'utf8');
                    return this.productsCarts
                } catch (error) {
                    throw new Error('Se produjo un error al crear el carrito', error);
                }
                
            }
        }catch (error) {
            console.log(error.message)
        }

    }

    async addProductsCarts(idCart, idProduct){
        try {
            //paso id de carts y recorro this.productsCarts
            const cart = this.productsCarts.find(carts => carts.id === idCart)
            
            if(cart){
                //crear array carrito con id y products
                try {
                    const product = await manager.getProductById(idProduct);
                    const productInCart = cart.products.find(prod => prod.id === product.id);

                    if(!productInCart){                        
                        const newProducts = {
                        id: product.id,
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        thumbnail: product.thumbnail,
                        code: product.code,
                        stock: product.stock,
                        category: product.category,
                        status: product.status,
                        quantity: 1                    
                        }
                        cart.products.push(newProducts)                        
                        await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.productsCarts), 'utf8');
                        return cart;
                    }else{  
                        const cartIndex = this.productsCarts.findIndex(prod => prod.id === idCart);
                        const cartInCarts = this.productsCarts[cartIndex];
                        const productInCartIndex = cartInCarts.products.findIndex(prod => prod.id === product.id);
                        const productInCartProduct = cartInCarts.products[productInCartIndex];
                        if(productInCartIndex !== -1){
                            productInCartProduct.quantity += 1 
                            
                        }
                    }

                } catch (error) {
                    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
                }
            }

        }catch (error) {
            throw new Error(`Se produjo un error al cargar el carrito con el id: ${idCart}`, error);
        }
        

    };

    async getByIdCarts(idCart){
        try {
            const data = await this.getProductsCarts();            
            let cart = data.find(c => c.id === idCart);
            if(!cart){
                return `No se ha encontrado carrito con este id:(${idCart}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`;
            }
            console.log(cart);
            return cart;
        } catch (error) {
            throw new Error('Se produjo un error al encontrar el carrito solicitado')
        }
    };

    async deleteCart(idCart){
        try {
            const data = await this.getProductsCarts();
            const cartIndex = data.findIndex(c => c.id === idCart);            
            if (cartIndex === -1) {
                return `No se encontró ningún carrito con id: ${idCart}.`;
            } else{
                data.splice(cartIndex, 1);
                this.productsCarts = data
                await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.productsCarts, null, 2));
                return console.log(`Carrito eliminado con id: ${idCart}`);
            }
            
        } catch (error) {
            throw new Error(`Error al eliminar el carrito: ${error}`);
        }

    }

    async deleteProductCart(idCart, idProduct){
        try {
            const data = await this.getProductsCarts();
            const cartIndex = data.findIndex(c => c.id === idCart);
            if (cartIndex === -1) {
                return `No se encontró ningún carrito con id: ${idCart}.`;
            } else {                
                const cartIndex = this.productsCarts.findIndex(prod => prod.id === idCart);
                const cartInCarts = this.productsCarts[cartIndex];
                
                const productInCartIndex = cartInCarts.products.findIndex(prod => prod.id === idProduct);
                
                const productInCartProduct = cartInCarts.products[productInCartIndex];
                
                if(productInCartProduct.quantity > 1){
                    productInCartProduct.quantity -= 1

                    this.productsCarts[cartInCarts] = {
                        ...productInCartProduct,
                        ...productInCartProduct.quantity
                    }

                    await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.productsCarts, null, idCart));        
                    return this.productsCarts[cartInCarts];
                }else{
                    console.log('estamos aca y mostramos')
                    data[cartIndex].products.splice(productInCartIndex, 1);
                    this.productsCarts = data;
                    console.log('borrando',this.productsCarts)

                    await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.productsCarts, null, 2));

                    return console.log(`se ha eliminado correctamente el products con id: (${idProduct}), del carrito id: (${idCart})`)
                }
            }
            
        } catch (error) {
            
        }

    }
    
}