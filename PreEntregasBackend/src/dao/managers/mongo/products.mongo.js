import productsModel from "../../models/products.models.js";

class ProductsManager{
    productsModel;
    constructor(){
        this.productsModel = productsModel
    }

    //retornar todos los products
    getProducts(){
        const products = this.productsModel.find()
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