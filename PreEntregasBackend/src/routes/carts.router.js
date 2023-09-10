import MyOwnRouter from './router.js';
import { addArrayInCart, addProductToCart, confirmBuy, createCart, deleteProductToCart, emptyCart, getDataCartById, updateQuantityProductInCart } from "../controllers/controller.carts.js";

export default class CartsRouter extends MyOwnRouter{
    init(){
        this.post('/:cid/purchase', ['USER'], confirmBuy );
        //ruta post / donde debe crear un carrito con id y products
        this.post('/', ['USER'], createCart)

        //muestra cada carrito con sus productos correspondientes
        this.get('/:cid',  ['ADMIN', 'USER'], getDataCartById);

        // ruta post/:idCart/:idProduct debe agregar un product al carrito solicitado
        this.post('/:cid/product/:pid', ['USER'], addProductToCart);

        //vacia el carrito
        this.delete('/:cid', ['USER'], emptyCart);

        //elimina el producto del carrito
        this.delete('/:cid/product/:pid', ['USER'], deleteProductToCart);

        //actualiza la quantity de prod
        this.put('/:cid/product/:pid', ['USER'], updateQuantityProductInCart);

        //actualiza el carrito al insertar un array de products desde el body
        this.put('/:cid', ['USER'], addArrayInCart)
    }
}