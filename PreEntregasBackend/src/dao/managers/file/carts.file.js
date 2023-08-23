import fs from 'fs';
import ProductsManagerFile from "../file/products.file.js";

const manager = new ProductsManagerFile

class CartsManagerFile{
    constructor(){
        this.carts = [];
        this.pathCarts = './assets/carts.json';
        
    }

    async getCarts(){
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
        let id = this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1;
        return id;
    }

    async createCart(){
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
                    this.carts.push(newCarts);
                    await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.carts), 'utf8');
                    return this.carts
                } catch (error) {
                    throw new Error('Se produjo un error al crear el carrito', error);
                }
                
            }
        }catch (error) {
            console.log(error.message)
        }

    }

    async addToCart(idCart, idProduct){
        try {
            
            const carts = await this.getProductsCarts();
            const cartIndex = carts.findIndex(carts => Number(carts.id) === Number(idCart))
            
            if(cartIndex !== -1){
                
                try {
                    const product = await manager.getProductById(idProduct);

                    const productInCart = carts[cartIndex].products.find(prod => prod.id === product.id);

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
                        };
                        
                        carts[cartIndex].products.push(newProducts);

                        this.carts = carts                       
                        
                        await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.carts), 'utf8');
                        return this.carts;
                    }else{  
                        const cartInCarts = carts[cartIndex];                        
                        const productInCartIndex = cartInCarts.products.findIndex(prod => prod.id === idProduct);                        
                        const productInCartProduct = cartInCarts.products[productInCartIndex];
                        
                        if(productInCartIndex !== -1){
                            productInCartProduct.quantity = productInCartProduct.quantity + 1;                            
                            this.carts = carts
                            await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.carts), 'utf8');
                            return this.carts
                        }
                    }

                } catch (error) {
                    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
                }
            }else{
                throw new Error(`El carrito con el id: (${idCart}) no existe, verifique los datos ingrersados`);
            }

        }catch (error) {
            throw new Error(`Se produjo un error al cargar el carrito con el id: ${idCart}`, error.message);
        }
        

    };

    async getCartById(idCart){
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
                this.carts = data
                await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.carts, null, 2));
                return console.log(`Carrito eliminado con id: ${idCart}`);
            }
            
        } catch (error) {
            throw new Error(`Error al eliminar el carrito: ${error}`);
        }

    }

    async deleteProductInCart(idCart, idProduct){
        try {
            const data = await this.getProductsCarts();
            const cartIndex = data.findIndex(c => c.id === idCart);
            
            if (cartIndex === -1) {
                return `No se encontró ningún carrito con id: ${idCart}.`;
            } else {                
                const cartIndex = this.carts.findIndex(prod => prod.id === idCart);
                const cartInCarts = this.carts[cartIndex];
                
                const productInCartIndex = cartInCarts.products.findIndex(prod => prod.id === idProduct);
                
                const productInCartProduct = cartInCarts.products[productInCartIndex];
                
                if(productInCartProduct.quantity > 1){
                    productInCartProduct.quantity -= 1

                    this.carts[cartInCarts] = {
                        ...productInCartProduct,
                        ...productInCartProduct.quantity
                    }

                    await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.carts, null, idCart));        
                    return this.carts[cartInCarts];
                }else{
                    
                    data[cartIndex].products.splice(productInCartIndex, 1);
                    this.carts = data;
                    await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.carts, null, 2));

                    return console.log(`se ha eliminado correctamente el products con id: (${idProduct}), del carrito id: (${idCart})`)
                }
            }
            
        } catch (error) {
            
        }

    }

    //falta emptyCart - vacia el carrito
    async emptyCart(idCart){
        
    }    

    //falta removeProductInCart - elimina el producto del carrito
    async removeProductToCart (idCart, idProduct){
        
        
    }   

    //falta updateQuantityOfProductsOnCart - modifica el quantity de los products    
    async updateQuantityOfProductsOnCart(idCart, idProduct, quantity){
        
    }    

    //falta addArrayProductsToCart - agrega un array de products al carrito
    async addArrayProductsToCart(idCart, products){

    }        
}

export default CartsManagerFile