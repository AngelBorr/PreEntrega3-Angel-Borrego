import { updateProducts } from "../public/js/socket.js";
import ProductsService from "../services/service.products.js";

const productsService = new ProductsService

//trae a todos los products
export const getDataProducts = async (req, res) => {
    try {
        const products = await productsService.getProducts();
        res.json({result: 'success', payload: products});        
        
    } catch (error) {
        throw new Error('No hay Productos para mostrar')
    }    
    
}
//trae el products solicitado
export const getDataProductById = async (req, res) => {   
    try {
        const id = req.params.pid;
        const product = await productsService.getProductById(id);        
        if (product) {
        return res.json(product);
        } else {
        return res.status(404).json(`Producto no encontrado con el id: ${id}`);
        }
    } catch (error) {
        return res.status(500).json(`Error al obtener el producto con el id: ${id}, verifique los datos`);
    }   
}
//crea un nuevo producto
export const createDataProduct = async (req, res) => {   
    try {        
        const bodyProduct = req.body
        const newProduct = await productsService.addProduct(bodyProduct)                
        if (newProduct) {
            updateProducts(req.app.get('io'));
            return res.json({status:"success"});
        } else {
            return res.status(404).json(`El producto no pudo agregrarse con exito`);
        }
    } catch (error) {
        return res.status(500).json(`Error al obtener el producto, verifique los datos`);
    }   
}
//actualiza un producto existente por su ID
export const updateDataProduct = async (req, res) => {        
    try {
        const { pid } = req.params
        const bodyProduct = req.body;

        const productUpdate = await productsService.updateProduct(pid, bodyProduct)
        if(!productUpdate){
            return res.status(404).json(`No se encontro productos con el id: ${pid}`)
        }else{
            return res.json(productUpdate)
        }
        
    } catch (error) {
        return res.status(500).send('Error al obtener el producto desde la base de datos');
    }   
}
//elimina un producto por su id
export const deleteDataProduct = async (req, res) => {    
    try {
        const { pid } = req.params
        const productDelete = await productsService.deleteProduct(pid)                
        if (productDelete) {
            updateProducts(req.app.get('io'));
            return res.json(`${productDelete}, eliminado correctamente`);
        } else {
            return res.status(404).json('Producto no encontrado');
        }
    } catch (error) {
        return res.status(500).json('Error al borrar el producto');
    }   
}