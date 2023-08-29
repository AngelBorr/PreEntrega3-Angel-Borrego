import productsModel from "../../models/products.models.js";
import env from '../../../config.js'

class ProductsManager{    
    constructor(){
        this.productsModel = productsModel
    }

    //retornar todos los products
    async getProducts(limit, page, sort, category){        
        const data = this.productsModel.find()

        let products = await this.productsModel.paginate(data, {
            limit: parseInt(limit) || env.paginate.limit,
            page: parseInt(page) || env.paginate.page,
            lean: true,
            customLabels: {
                docs: 'products',
                totalDocs: 'totalProducts', 
            }
        })
        
        if(sort){
            products.products = products.products.sort((a,b) => {
                if(sort === 'asc'){
                    return a.price - b.price;
                } else if (sort === 'desc'){
                    return b.price - a.price; 
                } else {
                    throw new Error('la opcion ingresada es incorrecta debe ser "asc" o "desc"')
                }
            });                                          
        }

        if(category){
            products.products = products.products.filter(product => product.category === category);
        }

        return products
    }

    //retornar un product por su id
    getProductById(id){
        const idMongo = {_id:id}
        const product = this.productsModel.findOne(idMongo)
        return product
    }

    //agregar un nuevo product
    createProduct(bodyProduct){
        const newProduct = bodyProduct
        const product = this.productsModel.create(newProduct)
        return product
    }

    //update product traerlo con su id y actualizarlo con los datos de req.body
    updateProduct (id, updateBodyProduct){
        const idMongo = {_id:id}
        const product = this.productsModel.updateOne(idMongo, updateBodyProduct)
        return product
    }

    //delete product
    deleteProduct(id){
        const idMongo = {_id:id}
        const product = this.productsModel.deleteOne(idMongo)
        return product
    }

}

export default ProductsManager