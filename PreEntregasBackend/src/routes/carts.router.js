import { Router } from "express";
import Carts from "../carts.js";
import ProductManager from "../productsManager.js";

const manager = new ProductManager;

const router = Router ();
const carts = new Carts;
//muestra cada carrito
router.get('/:id', async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const product = await carts.getProductsByIdCarts(productId);        
        if (product) {
        return res.send(product);
        } else {
        return res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        return res.status(500).send('Error al obtener el producto');
    } 
    
});

router.post('/:idCarts/:idProduct', async (req, res) => {
    const idCarts = Number(req.params.idCarts);
    const idProduct = Number(req.params.idProduct);
    
    try {
        const cart = await carts.getProductsByIdCarts(idCarts);
        const product = await manager.getProductById(idProduct);
        carts.addProductsCarts(cart.id, product.id);        
        res.send({status: 'success'});
    } catch (error) {
        return res.status(500).send('Error al obtener el producto para ingresarlo al carrito');
    }  
    
    
});

export default router;


