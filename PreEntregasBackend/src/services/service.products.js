import ProductsRepository from "../repositories/product.repository.js";
import CustomError from "./errors/customError.js";
import EErrors from "./errors/enums.js";
import { generateProductsErrorInfo } from "./errors/info.js";
import UsersService from '../services/service.users.js'
import MailingService from '../services/service.mailing.js'

const mailingService = new MailingService
const userService = new UsersService
class ProductsService{    
    constructor(){
        this.products = new ProductsRepository
    }
    
    //retorna los products
    async getProducts(limit, page, sort, category) {
        const getData = async () => {
            try {
                let data = await this.products.getProducts(limit, page, sort, category);
                return data
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
    async addProduct(req){        
        try {
            const { title, description, price, thumbnail, code, stock, status, category } = req.body            
            if(!title || !description || !price || !thumbnail || !code || !stock || !status || !category){
                req.logger.error('Se produjo un error al crear el producto')
                CustomError.createError({
                    name: 'Products Creation Error',
                    cause: generateProductsErrorInfo({ title, description, price, thumbnail, code, stock, status, category }),
                    code: EErrors.INVALID_TYPES_ERROR,
                    message: 'Error trying to create a new Products'
                });
            }
            const user = await userService.getUsers(req.user.email)
            if(!user){
                user._id = 'admin'
                return user._id
            }
            const productData = {
                ...req.body,
                owner: user._id
            }
            const newProduct = await this.products.createProduct(productData)
            return newProduct
        } catch (error) {
            throw new Error(`error al crear un nuevo producto: ${error.message}`)            
        }
    }

    //update products
    async updateProduct(id, updateBodyProduct) {
        try {
            const existingProduct = await this.products.getProductById(id);
            if(!existingProduct){
                throw new Error(`El producto que se desea actualizar no existe: ${Error.message}`);
            }
            const user = await userService.getUserById(existingProduct.owner)
            if(user.role === 'admin' || existingProduct.owner === 'admin'){
                const updateProduct = await this.products.updateProduct(id,updateBodyProduct)
                return updateProduct
            }else if(user._id === existingProduct.owner && user.role === 'premium'){
                const updateProduct = await this.products.updateProduct(id,updateBodyProduct)
                return updateProduct
            }else{
                throw new Error(`El role establecido no permite la accion que deseas realizar`);
            }            
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }        
    }

    //delete products
    async deleteProduct(req) {                
        try {
            const id = req.params.pid            
            const existingProduct = await this.products.getProductById(id)
            if(!existingProduct){
                throw new Error(`El producto que se desea eliminar no existe: ${Error.message}`);
            }
            //usuario solicitante que role tiene?
            const requestingUser = req.user
            if(requestingUser.role === 'admin'){
                const user = await userService.getUserById(existingProduct.owner)
                if(user.role === 'premium'){
                    const sendMail = await mailingService.createEmailOfDeleteProduct(user, existingProduct)
                    if(sendMail){
                        const productDelete = await this.products.deleteProduct(id)
                        return productDelete
                    }
                }else{
                    const productDelete = await this.products.deleteProduct(id);
                    return productDelete
                }                
            }else if (requestingUser.role === 'premium'){
                if(requestingUser._id === existingProduct.owner){
                    const productDelete = await this.products.deleteProduct(id)
                    return productDelete
                }else{
                    throw new Error(`El role establecido no permite la accion que deseas realizar`);
                }                
            }else{
                throw new Error(`El role establecido no permite la accion que deseas realizar`);
            }            
        } catch (error) {
            console.log(error)
            throw new Error(`Error al eliminar el producto: ${error}`);
        }
    }
}

export default ProductsService