import { Router } from "express";
import { addArrayInCart, addProductToCart, createCart, deleteProductToCart, emptyCart, getDataCartById, updateQuantityProductInCart } from "../controllers/controller.carts.js";

const router = Router ();

//ruta post / donde debe crear un carrito con id y products
router.post('/', createCart)

//muestra cada carrito con sus productos correspondientes
router.get('/:cid', getDataCartById);

// ruta post/:idCart/:idProduct debe agregar un product al carrito solicitado
router.post('/:cid/product/:pid', addProductToCart);

//vacia el carrito
router.delete('/:cid', emptyCart);

//elimina el producto del carrito
router.delete('/:cid/product/:pid', deleteProductToCart);

//actualiza la quantity de prod
router.put('/:cid/product/:pid', updateQuantityProductInCart);

//actualiza el carrito al insertar un array de products desde el body
router.put('/:cid', addArrayInCart)

export default router;