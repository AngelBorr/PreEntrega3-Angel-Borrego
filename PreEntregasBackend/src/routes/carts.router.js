import MyOwnRouter from './router.js';
import { addArrayInCart, addProductToCart, confirmBuy, createCart, deleteProductToCart, emptyCart, getDataCartById, updateQuantityProductInCart } from "../controllers/controller.carts.js";

export default class CartsRouter extends MyOwnRouter{
    init(){
        this.post('/:cid/purchase', ['USER', 'PREMIUM'], confirmBuy );
        //ruta post / donde debe crear un carrito con id y products
        this.post('/', ['USER', 'PREMIUM'], createCart)

        //muestra cada carrito con sus productos correspondientes
        this.get('/:cid',  ['ADMIN', 'USER', 'PREMIUM'], getDataCartById);

        // ruta post/:idCart/:idProduct debe agregar un product al carrito solicitado
        this.post('/:cid/product/:pid', ['USER', 'PREMIUM'], addProductToCart);

        //vacia el carrito
        this.delete('/:cid', ['USER', 'PREMIUM'], emptyCart);

        //elimina el producto del carrito
        this.delete('/:cid/product/:pid', ['USER', 'PREMIUM'], deleteProductToCart);

        //actualiza la quantity de prod
        this.put('/:cid/product/:pid', ['USER', 'PREMIUM'], updateQuantityProductInCart);

        //actualiza el carrito al insertar un array de products desde el body
        this.put('/:cid', ['USER', 'PREMIUM'], addArrayInCart)
    }
}