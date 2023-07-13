import { Router } from "express";
import CartsManager from "../dao/cartsManagerMongo.js";

const carts = new CartsManager;
const router = Router ();

//ruta post / donde debe crear un carrito con id y products
router.post('/', async (req, res) => {
    try {        
        const newCart = await carts.addCarts();
                
        if(newCart){
            return res.json('se ha agregado exitosamente un nuevo carrito');
        }else{
            return res.status(404).json(`No pudo agregrarse con exito un nuevo carrito`);
        }
        
    } catch (error) {
        return res.status(500).json(`Error al intentar crear el carrito`, error);
    }
})

//muestra cada carrito con sus productos correspondientes
router.get('/:cid', async (req, res) => {
    try {
        const id = req.params.cid;
        const cart = await carts.getCartById({_id:id});
        
        if (cart) {
        return res.json(cart);
        } else {
        return res.status(404).json('Carrito no encontrado');
        }
    } catch (error) {
        return res.status(500).json('Error al obtener el Carrito');
    }    
});

// ruta post/:idCart/:idProduct debe agregar un product al carrito solicitado
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;

        const newProductInCart = await carts.addProductsCart(idCart, idProduct);

        res.status(200).json(`Producto con el id: (${idProduct}), agregado con exito`);
    } catch (error) {
        res.status(500).json('Error al agregar producto al carrito');
    }    
});
//vacia el carrito
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cartDelete = await carts.emptyCart(cid)
        if (cartDelete) {            
            return res.json(`Se ha vaciado correctamente el carrito con el id: ${cid}`);
        } else {
            return res.status(404).json(`Carrito con id: {cid}, no encontrado`);
        }
    } catch (error) {
        return res.status(500).json('Error al vaciar el carrito');
    }
})
//elimina el producto del carrito
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const cartDelete = await carts.deleteProductCart(idCart, idProduct)
        
        if (cartDelete) {            
            return res.json(`se ha eliminado correctamente el producto con id: ${idProduct}, del carrito con el id: ${idCart}`);
        } else {
            return res.status(404).json('Carrito o producto no encontrado verifique los datos ingresados');
        }
    } catch (error) {
        return res.status(500).json('Error al borrar el el producto del carrito');
    }
})
//actualiza la quantity de prod
router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const quantity = req.body.quantity
        const updateQuantityProduct = await carts.updateProductInCart(idCart, idProduct, quantity)
        
        if (updateQuantityProduct) {            
            return res.json(`se ha actualizado correctamente el producto con id: ${idProduct}, del carrito con el id: ${idCart}`);
        } else {
            return res.status(404).json('Carrito o producto no encontrado verifique los datos ingresados');
        }
    } catch (error) {
        return res.status(500).json('Error al borrar el el producto del carrito');
    }
})
//actualiza el carrito al insertar un array de products desde el body
router.put('/:cid', async (req, res) => {
    try {
        const products = req.body; 
        const id = req.params.cid

        const cart = await carts.addProductsInCartExisten({_id:id}, products);        
        if (cart) {
        return res.status(200).json(`se ha actualizado correctamente el carrito con id: ${id}`);
        } else {
        return res.status(404).json('Carrito no encontrado');
        }
    } catch (error) {
        return res.status(500).json('Error al obtener el Carrito');
    }    
})

export default router;