import { Router } from 'express';
import { createDataProduct, deleteDataProduct, getDataProductById, getDataProducts, updateDataProduct } from '../controllers/controller.products.js';

const router = Router();

//traer todos los products
router.get('/', getDataProducts);

// debera traer solamente el producto solicitado con el id del producto
router.get('/:pid', getDataProductById);

//ahora la ruta post recibe el producto desde formAddProducts.handlebars
router.post('/', createDataProduct);

// la ruta put debera actualizar las propiedades del productos con los campos dados desde el body
router.put('/:pid', updateDataProduct);

//debera eliminar el producto con el id indicado
router.delete('/:pid', deleteDataProduct);

export default router

