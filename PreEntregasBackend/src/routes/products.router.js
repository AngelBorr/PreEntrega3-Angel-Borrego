import ProductManager from '../productsManager.js';
import { Router } from 'express';

const router = Router();

const manager = new ProductManager;

//trae los productos con send desde el json
router.get('/', async (req, res) => {
    try {
        res.send(await manager.getProducts());
        return `Producto en server`;
    } catch (error) {
        throw new Error('No se pudo mostrar productos en el server')
    }    
    
});

router.get('/:id', async (req, res) => {    
    try {
        const productId = Number(req.params.id);
        const product = await manager.getProductById(productId);        
        if (product) {
        return res.send(product);
        } else {
        return res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        return res.status(500).send('Error al obtener el producto');
    }   
});

router.put('/:id', async (req, res) => {    
    try {
        const productId = Number(req.params.id);
        const product = await manager.updateProduct(productId);        
        if (product) {
        return res.send(product);
        } else {
        return res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        return res.status(500).send('Error al obtener el producto');
    }   
});

router.delete('/:id', async (req, res) => {    
    try {
        const productId = Number(req.params.id);
        const product = await manager.deleteProduct(productId);        
        if (product) {
        return res.send(`${product}, eliminado correctamente`);
        } else {
        return res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        return res.status(500).send('Error al borrar el producto');
    }   
});

export default router

