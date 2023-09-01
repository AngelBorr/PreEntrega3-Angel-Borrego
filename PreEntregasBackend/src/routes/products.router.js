import MyOwnRouter from './router.js';
import { createDataProduct, deleteDataProduct, getDataProductById, getDataProducts, updateDataProduct } from '../controllers/controller.products.js';

export default class ProductsRouter extends MyOwnRouter{
    init(){
        //debera traer todos los products
        this.get('/', getDataProducts);
        // debera traer solamente el producto solicitado con el id del producto
        this.get('/:pid', ['ADMIN', 'USER'], getDataProductById);

        //ahora la ruta post recibe el producto desde formAddProducts.handlebars
        this.post('/', ['ADMIN'], createDataProduct);

        // la ruta put debera actualizar las propiedades del productos con los campos dados desde el body
        this.put('/:pid', ['ADMIN'], updateDataProduct);

        //debera eliminar el producto con el id indicado
        this.delete('/:pid', ['ADMIN'], deleteDataProduct);
    }
}






