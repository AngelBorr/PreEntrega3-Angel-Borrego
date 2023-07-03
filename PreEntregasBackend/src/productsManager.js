import fs from 'fs'
import productsModel from './models/products.models.js';

export default class ProductManager {
    productsModel; 
    constructor() {
        this.productsModel = productsModel
        /* this.products = [];
        this.path = "./assets/products.json"; */
                
    }

    //retorna los prod
    async getProducts() {
        const getData = async () => {
            try {
                console.log('estas aca')
                const data = await productsModel.find({})
                //const data = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(data)
            } catch (error) {
                /* try {
                    await fs.promises.writeFile(this.path, '[]');
                    return []
                } catch (error) {
                    throw new Error('Se produjo un error al mostrar los datos desde el Json');
                } */

                console.log(error.message)
                
            }
        }
        try {
            return await getData();
        } catch (error_2) {
            throw error_2;
        }
    }

    //generador de id
    generateId() {
        let id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        return id;       
        
    }
    
    //agrega los prod a products y muestra por consola el code existente
    async addProduct(bodyProduct){//{title, description, price, thumbnail, code, stock, status, category}) {
        
        try {
            const newProduct = await productsModel.create(bodyProduct)
            console.log(newProduct)
            return newProduct; 
        } catch (error) {
            console.log('error al crear un nuevo producto '+ error)
        }                 
        
    }

    //modificar un producto
    async updateProduct(id, updates) {
        try {
            const productIndex = this.products.findIndex(product => product.id === id);
        
            if (productIndex === -1) {
                throw new Error(`No se encontró ningún producto con el ID ${id}.`);
            }
        
            this.products[productIndex] = {
                ...this.products[productIndex],
                ...updates
            };
        
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, id));        
            return this.products[productIndex];
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
        
    }

    //busca un prod por su id
    async getProductById(id) {
        try {
            const data = await this.getProducts();            
            let product = data.find((product) => Number(product.id) === Number(id));
            if(!product){
                return `No se ha encontrado Productos con este id:(${id}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`;
            }
            return product;
        } catch (error) {
            throw new Error('Se produjo un error al leer los datos desde el Json')
        }
    }

    //elimina un producto
    async deleteProduct(id) {                
        try {
            const data = await this.getProducts();
            const productIndex = data.findIndex(product => Number(product.id) === Number(id));            
            if (productIndex === -1) {
            return `No se encontró ningún producto con id ${id}.`;
            } else{
                data.splice(productIndex, 1);
                this.products = data
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
                return `Producto eliminado con id: ${id}`;
            }
            
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error}`);
        }
    }

}





