import productsModel from '../dao/models/products.models.js';

class ProductManager {
    productsModel; 
    constructor() {
        this.productsModel = productsModel
        
    }

    //retorna los prod
    async getProducts(limit = 5, page = 1, sort, category) {
        const getData = async () => {
            try { 
                let data = productsModel.find();                
                
                if(sort){
                    if(sort === 'asc'){
                        data = data.sort({price:1});                        
                    } else if (sort === 'desc'){
                        data = data.sort({price:-1});
                    } else {
                        throw new Error('la opcion ingresada es incorrecta debe ser "asc" o "desc"')
                    }                    
                }
                //console.log('1', data)
                if(category){
                    if(category === 'indumentaria'){
                        productsModel.aggregate({ $match: {category: 'indumentaria'} },
                        { $project: { title: 1, description: 1, price: 1, thumbnail: 1, code: 1, stock: 1, status: 1, category: 1 } }
                        ).exec().then((result) => {
                            data = result
                            return data
                        }).catch((err) => {
                            console.log(err);
                        }); 
                        
                    }else if(category === 'accesorios'){
                        await productsModel.aggregate([{ $match: {category: 'accesorios'} },
                        { $project: { title: 1, description: 1, price: 1, thumbnail: 1, code: 1, stock: 1, status: 1, category: 1 } }]
                        ).exec().then((result) => {
                            data = result
                            return data
                        }).catch((err) => {
                            console.log(err);
                        });                                                
                    }
                }else{
                    const products = await productsModel.paginate(data, {
                        lean:true,
                        limit: parseInt(limit),
                        page: parseInt(page),
                        customLabels: {
                            docs: 'products',
                            totalDocs: 'totalProducts',
                        }
                    })
                    
                    return products
                }                
                
                
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

    /* //generador de id
    generateId() {
        let id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        return id;       
        
    } */
    
    //agrega los prod a products y muestra por consola el code existente
    async addProduct(bodyProduct){        
        try {
            const newProduct = await this.productsModel.create(bodyProduct)
            return newProduct; 
        } catch (error) {
            console.log('error al crear un nuevo producto '+ error)
        }                 
        
    }

    //modificar un producto
    async updateProduct(id, updateBodyProduct) {
        try {
            const updateProduct = await this.productsModel.updateOne({_id:id},updateBodyProduct)
            return updateProduct
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
        
    }

    //busca un prod por su id
    async getProductById(id) {
        try {
            const data = await this.productsModel.findOne({_id:id});            
            if(!data){
                return `No se ha encontrado Productos con este id:(${id}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`;
            }
            return data;
        } catch (error) {
            throw new Error('Se produjo un error al leer los datos desde el Json')
        }
    }

    //elimina un producto
    async deleteProduct(id) {                
        try {
            const productDelete = await this.productsModel.deleteOne({_id:id});
            return productDelete;
                        
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error}`);
        }
    }

}

export default ProductManager