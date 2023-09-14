import { updateProducts } from "../public/js/socket.js";
import ProductsService from "../services/service.products.js";

const productsService = new ProductsService

//trae a todos los products
export const getDataProducts = async (req, res) => {
    try {
        const products = await productsService.getProducts();
        req.logger.info('Se solicitan todos los productos')
        res.json({result: 'success', payload: products})
    } catch (error) {
        req.logger.fatal('No se ha podido traer los productos de la base de datos')
        throw new Error('No hay Productos para mostrar')
    }    
    
}
//trae el products solicitado
export const getDataProductById = async (req, res) => {   
    try {
        const id = req.params.pid;
        req.logger.debug(`se solicita el producto con el id: ${id}`)
        const product = await productsService.getProductById(id)
        if (product) {
            req.logger.info(`Se realizo exitosamente la busqueda del producto con el id: ${id}`)
            return res.json(product);
        } else {
            req.logger.error(`Se ha producido un error al buscar el producto con el id: ${id}`)
            return res.status(404).json(`Producto no encontrado con el id: ${id}`);
        }
    } catch (error) {
        req.logger.fatal('No se pudo obtener el Producto solicitado')
        return res.status(500).json('Error al obtener el producto, verifique los datos');
    }   
}
//crea un nuevo producto
export const createDataProduct = async (req, res) => {   
    try {        
        const bodyProduct = req.body
        req.legger.debug(`se solicita crear un nuevo producto con los siguientes datos: ${bodyProduct}`)
        const newProduct = await productsService.addProduct(bodyProduct)                
        if (newProduct) {
            req.logger.info(`Se ha creado exitosamente el producto: ${newProduct}`)
            updateProducts(req.app.get('io'));
            return res.json({status:"success"});
        } else {
            req.logger.error('Se produjo un error al crear el producto nuevo')
            return res.status(404).json(`El producto no pudo crearse con exito`);
        }
    } catch (error) {
        req.logger.fatal('Se produjo un error al obtener los datos para crear un nuevo producto')
        return res.status(500).json(`Error al obtener el producto, verifique los datos`);
    }   
}
//actualiza un producto existente por su ID
export const updateDataProduct = async (req, res) => {        
    try {
        const { pid } = req.params
        const bodyProduct = req.body;
        req.logger.debug(`Se solicita cambiar la siguiente propiedad: ${bodyProduct}, del producto con el id: ${pid}`)
        const productUpdate = await productsService.updateProduct(pid, bodyProduct)
        if(!productUpdate){
            req.logger.error(`Se produjo un error al intentar cambiar las propiedades del producto con el id: ${pid}`)
            return res.status(404).json(`No se encontro productos con el id: ${pid}`)
        }else{
            req.logger.info(`Se han actualizado correctamente las propiedades del producto con el id: ${pid}`)
            return res.json(productUpdate)
        }        
    } catch (error) {
        req.logger.fatal('Se produjo un error al intentar actualizar el producto')
        return res.status(500).send('Error intentar actualizar el producto');
    }   
}
//elimina un producto por su id
export const deleteDataProduct = async (req, res) => {    
    try {
        const { pid } = req.params
        req.logger.debug(`Se solicita borrar el producto con el id: ${pid}`)
        const productDelete = await productsService.deleteProduct(pid)
        if (productDelete) {
            req.logger.info('Producto eliminado correctamente')
            updateProducts(req.app.get('io'));
            return res.json(`${productDelete}, eliminado correctamente`);
        } else {
            req.logger.error('Se produjo un error al intentar eliminar le producto')
            return res.status(404).json('Producto no encontrado');
        }
    } catch (error) {
        req.logger.fatal('Error al eliminar el producto, verifique los datos')
        return res.status(500).json('Error al borrar el producto');
    }   
}