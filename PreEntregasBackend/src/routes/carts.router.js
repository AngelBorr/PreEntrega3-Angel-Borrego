import { Router } from "express";
import CartsManager from "../cartsManager.js";
import ProductManager from "../productsManager.js";


const manager = new ProductManager;
const carts = new CartsManager;
const router = Router ();


//ruta post / donde debe crear un carrito con id y products
router.post('/', async (req, res) => {
    try {
        const cartsLenght = carts.productsCarts.length;
        const newCart = await carts.addCarts();
        const cartsInCarts = await carts.getProductsCarts();
        
        if(cartsInCarts.length > cartsLenght){
            return res.send('se ha agregado exitosamente un nuevo carrito');
        }else{
            return res.status(404).send(`No pudo agregrarse con exito un nuevo carrito`);
        }
        
    } catch (error) {
        return res.status(500).send(`Error al intentar crear el carrito`, error);
    }
})

//muestra cada carrito con sus productos correspondientes
router.get('/:id', async (req, res) => {
    try {
        const cartId = Number(req.params.id);
        const cart = await carts.getByIdCarts(cartId);
        
        if (cart) {
        return res.send(cart);
        } else {
        return res.status(404).send('Carrito no encontrado');
        }
    } catch (error) {
        return res.status(500).send('Error al obtener el Carrito');
    } 
    
});

// ruta post/:idCart/:idProduct debe agregar un product al carrito solicitado
router.post('/:idCart/product/:idProduct', async (req, res) => {
    try {
        //paso id de carts y recorro this.productsCarts
        const idCart = Number(req.params.idCart);
        const idProduct = Number(req.params.idProduct);

        const newProductInCart = carts.addProductsCarts(idCart, idProduct);
        
        res.status(200).send(`Producto con el id: (${idProduct}), agregado con exito`);
    } catch (error) {
        res.status(500).send('Error al agregar producto al carrito');
    }
    
});

export default router;


