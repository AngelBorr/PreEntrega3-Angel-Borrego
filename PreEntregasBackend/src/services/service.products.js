import ProductsRepository from "../repositories/product.repository.js";

class ProductsService{    
    constructor(){
        this.products = new ProductsRepository
    }
    
    //retorna los products
    async getProducts(limit = 5, page = 1, sort, category) {
        const getData = async () => {
            try { 
                let data = this.products.getProducts();                
                
                if(sort){
                    if(sort === 'asc'){
                        data = data.sort({price:1});                        
                    } else if (sort === 'desc'){
                        data = data.sort({price:-1});
                    } else {
                        throw new Error('la opcion ingresada es incorrecta debe ser "asc" o "desc"')
                    }                    
                }                
                /* if(category){
                    if(category === 'indumentaria'){
                        data.f
                        productsModel.aggregate({ $match: {category: 'indumentaria'} },
                        { $project: { title: 1, description: 1, price: 1, thumbnail: 1, code: 1, stock: 1, status: 1, category: 1 } }
                        ).exec().then((result) => {
                            const products = result
                            return products
                        }).catch((err) => {
                            console.log(err);
                        });                         
                    }else if(category === 'accesorios'){
                        await data.aggregate([{ $match: {category: 'accesorios'} },
                        { $project: { title: 1, description: 1, price: 1, thumbnail: 1, code: 1, stock: 1, status: 1, category: 1 } }]
                        ).exec().then((result) => {
                            const products = result
                            return products
                        }).catch((err) => {
                            console.log(err);
                        });                                                
                    }
                }else{
                    
                }  */ //productsModel.paginate               
                const products = await this.products.getProducts(data, {
                    lean:true,
                    limit: parseInt(limit),
                    page: parseInt(page),
                    customLabels: {
                        docs: 'products',
                        totalDocs: 'totalProducts',
                    }
                })
                    
                return products
                
            } catch (error) {
                console.log(error.message)                
            }
        }
        try {
            return await getData();
        } catch (error_2) {
            throw error_2;
        }
    }

    //retorna los products por su id
    async getProductById(id) {
        try {
            const data = await this.products.getProductById(id);            
            if(!data){
                return `No se ha encontrado Productos con este id:(${id}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`;
            }
            return data;
        } catch (error) {
            throw new Error('Se produjo un error al leer los datos desde el Json')
        }
    }

    //agrega new products a products
    async addProduct(bodyProduct){        
        try {
            const newProduct = await this.products.createProduct(bodyProduct)
            return newProduct; 
        } catch (error) {
            console.log('error al crear un nuevo producto '+ error)
        }                 
        
    }

    //update products
    async updateProduct(id, updateBodyProduct) {
        try {
            const existingProduct = await this.products.getProductById(id);
            if(!existingProduct){
                throw new Error(`El producto que se desea actualizar no existe: ${error.message}`);
            }
            const updateProduct = await this.products.updateProduct(id,updateBodyProduct)
            return updateProduct
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
        
    }

    //delete products
    async deleteProduct(id) {                
        try {
            const existingProduct = await this.products.getProductById(id);
            if(!existingProduct){
                throw new Error(`El producto que se desea eliminar no existe: ${error.message}`);
            }
            const productDelete = await this.products.deleteProduct(id);
            return productDelete;
                        
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error}`);
        }
    }
}

export default ProductsService