import fs from 'fs';

class ProductsManagerFile{
    constructor(){
        this.products = [];
        this.pathProducts = './assets/products.json'
    }

    //traer a todos los productos
    async getProducts(){
        const data = await fs.promises.readFile(this.pathProducts, 'utf8')
        const dataJson = JSON.parse(data)
        return dataJson
    }

    //traer los productos por su id
    async getProductById (id){
        const data = await this.getProducts();
        const product = data.find(prod => prod.id === id)
        return product
    }

    generateIdCarts(){
        let id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        return id;
    }

    //agregar un nuevo producto
    async createProduct(bodyProduct){
        const data = await fs.promises.readFile(this.pathProducts, 'utf8');        
        if(!data){
            await fs.promises.writeFile(this.pathProducts, '[]');
            return []
        } 
        const newProduct = {
            id: this.generateIdUsers(),
            ...bodyProduct
        }
        this.products.push(newProduct)
        await fs.promises.writeFile(this.pathProducts, JSON.stringify(this.products), 'utf8')
        return this.products
    }

    //update de products
    async updateProduct(id, bodyUpdate){
        const product = await this.getProductById(id)
        if(product){
            Object.assign(product, bodyUpdate);
            const updateProduct = JSON.stringify(product, null, 2);
            await fs.promises.writeFile(this.pathProducts, updateProduct, 'utf8')
            return product
        }else{
            return product
        }
    }

    //delete producto
    async deleteProduct(id){
        const data = await this.getProducts();
        const index = data.findIndex(prod => prod.id === id)
        if(index !== -1){
            data.splice(index, 1)
            this.products = data
            await fs.promises.writeFile(this.pathProducts, JSON.stringify(this.products, null, 2))
            return this.products
        }else{
            return index
        }
    }

}

export default ProductsManagerFile