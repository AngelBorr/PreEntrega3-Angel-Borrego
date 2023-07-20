import ProductManager from '../dao/productsManager.js';
import { Router } from 'express';
import { updateProducts } from '../public/js/socket.js';

const router = Router();

const manager = new ProductManager;

//traer todos los products
router.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        res.json({result: 'success', payload: products});        
        
    } catch (error) {
        throw new Error('No hay Productos para mostrar')
    }    
    
});

// debera traer solamente el producto solicitado con el id del producto
router.get('/:pid', async (req, res) => {   
    try {
        const id = req.params.pid;
        const product = await manager.getProductById({_id:id});        
        if (product) {
        return res.json(product);
        } else {
        return res.status(404).json(`Producto no encontrado con el id: ${id}`);
        }
    } catch (error) {
        return res.status(500).json(`Error al obtener el producto con el id: ${id}, verifique los datos`);
    }   
});

// crear ruta post que debera agregar un producto con todos los campos (propiedades)
//ahora la ruta post recibe el producto desde formAddProducts.handlebars

router.post('/', async (req, res) => {   
    try {        
        const bodyProduct = req.body
        console.log(bodyProduct)
        const newProduct = await manager.addProduct(bodyProduct)
                
        if (newProduct) {
            updateProducts(req.app.get('io'));
            return res.json({status:"success"});
        } else {
            return res.status(404).json(`El producto no pudo agregrarse con exito`);
        }
    } catch (error) {
        return res.status(500).json(`Error al obtener el producto, verifique los datos`);
    }   
});

// la ruta put debera actualizar las propiedades del productos con los campos dados desde el body
router.put('/:pid', async (req, res) => {        
    try {
        const { pid } = req.params
        const bodyProduct = req.body;

        const productUpdate = await manager.updateProduct(pid, bodyProduct)
        if(!productUpdate){
            return res.status(404).json(`No se encontro productos con el id: ${pid}`)
        }else{
            return res.json(productUpdate)
        }
        
    } catch (error) {
        return res.status(500).send('Error al obtener el producto desde la base de datos');
    }   
});

//debera eliminar el producto con el id indicado
router.delete('/:pid', async (req, res) => {    
    try {
        const { pid } = req.params
        const productDelete = await manager.deleteProduct(pid)                
        if (productDelete) {
            updateProducts(req.app.get('io'));
            return res.json(`${productDelete}, eliminado correctamente`);
        } else {
            return res.status(404).json('Producto no encontrado');
        }
    } catch (error) {
        return res.status(500).json('Error al borrar el producto');
    }   
});

export default router

