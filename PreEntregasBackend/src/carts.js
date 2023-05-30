import fs from 'fs';
import ProductManager from "./productsManager.js";

const manager = new ProductManager

export default class Carts{
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

    //cuando se agrega un nueva producto hay que incorporarle al producto la nueva propiedad cantidad o quantity
    
    async addProductsCarts(id){
        
        try{
            const product = await manager.getProductById(id);
            const productCart = this.productsCarts.find(prod => prod.product.id === product.id);
            
            if (!productCart) {
                
                const newProductsCarts = {
                id: this.generateIdCarts(),
                product: product,
                quantity: 1
                }

                if (newProductsCarts){
                    this.productsCarts.push(newProductsCarts);
                    try {
                        await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.productsCarts), 'utf8')
                        
                    } catch (error) {
                        console.error(error.message);
                        throw new Error('Se produjo un error al imprimir los datos desde el Json')
                    }
                }
                return newProductsCarts;
                ///cambia la propiedad quantity
            }else {
                productCart.quantity = productCart.quantity + 1;
                return productCart;
            }      
            
        }catch{
            console.error(error.message);
        }

    }

    quantityProductsCarts(){
        
        const productCart = this.productsCarts.find(product => product.product === product);

        if (productCart) {            
            return productCart.quantity++
        }else{
            return 1
        }

    }

    async getProductsByIdCarts(id){
        try {
            const data = await this.getProductsCarts();            
            let product = data.find((product) => Number(product.id) === Number(id));
            if(!product){
                return `No se ha encontrado Productos con este id:(${id}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`;
            }
            return product;
        } catch (error) {
            throw new Error('Se produjo un error al leer los datos desde el Json')
        }
    }

    deleteProductsByIdCarts(){

    }

    async deleteProductsCarts(id){
        try {
            const data = await this.getProductsCarts();
            const productIndex = data.findIndex(product => Number(product.id) === Number(id));            
            if (productIndex === -1) {
            return `No se encontró ningún producto con id ${id}.`;
            } else{
                data.splice(productIndex, 1);
                this.productsCarts = data
                await fs.promises.writeFile(this.pathCarts, JSON.stringify(this.productsCarts, null, 2));
                return `Producto eliminado con id: ${id}`;
            }
            
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error}`);
        }

    }
}