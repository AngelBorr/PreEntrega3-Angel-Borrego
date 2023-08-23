import DaosFactory from "../dao/factory.js";

const productManager = new DaosFactory
const products = productManager.productsDao()

class ProductsRepository{    
    constructor(){}

    //retorna el usuario
    async getProducts(){        
        const data = await products.getProducts()
        return data
    }

    async getProductById(id){
        const product = await products.getProductById(id);                       
        return product
    }
    
    async createProduct(bodyProduct){
        const product = await products.createProduct(bodyProduct);
        return product
    }
    
    async updateProduct(id, updateBodyProduct){
        const product = await products.updateProduct(id, updateBodyProduct)
        return product
    }

    async deleteProduct(id){
        const product = await products.deleteProduct(id)
        return product
    }
}

export default ProductsRepository