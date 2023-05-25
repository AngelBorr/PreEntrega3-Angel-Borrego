import fs from 'fs'

export default class ProductManager {  
    constructor() {
        this.products = [];
        this.path = "./assets/products.json";
                
    }

    //retorna los prod
    async getProducts() {
        const getData = async () => {
            try {
                const data = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(data)
            } catch (error) {
                try {
                    await fs.promises.writeFile(this.path, '[]');
                    return []
                } catch (error) {
                    throw new Error('Se produjo un error al mostrar los datos desde el Json');
                }
                
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
    async addProduct({title, description, price, thumbnail, code, stock}) {
        //validaciones de propiedades
        if (this.products.some(product => product.code === code)) {
            let error = `El code ingresado ya existe en otro Producto: (${code})`;
            return error;
        }       
        
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            throw new Error("No se pudo agregar el producto, falta su precio y/o el formato no es el correcto. El precio debe ser un número positivo.");
        }

        if (typeof title !== "string" || title.trim() === "") {
            throw new Error("No se pudo agregar el producto, falta y/o existe producto con ese titulo");
        }

        if (typeof description !== "string" || description.trim() === "") {
            throw new Error("No se pudo agregar el producto, falta su descripcion");
        }

        if (typeof thumbnail !== "string" || thumbnail.trim() === "") {
            throw new Error("No se pudo agregar el producto, falta una imagen.");
        }

        if (typeof code !== "string" || code.trim() === "") {
            throw new Error("No se pudo agregar el producto, falta codigo producto.");
        }

        const parsedStock = parseInt(stock);
        if (isNaN(parsedStock) || parsedStock < 0) {
            throw new Error("El stock debe ser un número entero no negativo.");
        }

        const newProduct = {
            id: this.generateId(),
            title: title.trim(),
            description: description.trim(),
            price: parsedPrice,
            thumbnail: thumbnail.trim(),
            code: code.trim(),
            stock: parsedStock
        };

        if(newProduct){
            this.products.push(newProduct);
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf8')
                //
            } catch (error) {
                console.error(error.message);
                throw new Error('Se produjo un error al imprimir los datos desde el Json')
            }
        }

        return newProduct;          
        
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





