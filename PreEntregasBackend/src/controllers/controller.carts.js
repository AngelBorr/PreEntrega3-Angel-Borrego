import CartService from "../services/service.carts.js";

const cartsService = new CartService

//crea un carrito
export const createCart = async (req, res) => {
    try {        
        const newCart = await cartsService.addCarts();                
        if(newCart){
            return res.status(200).json('se ha creado exitosamente un nuevo carrito');
        }else{
            return res.status(404).json(`No pudo crearse con exito un nuevo carrito`);
        }
        
    } catch (error) {
        return res.status(500).json(`Error al intentar crear el carrito`, error);
    }
}

//muestra cada carrito con sus productos
export const getDataCartById = async (req, res) => {
    try {
        const id = req.params.cid;
        const cart = await cartsService.getCartById(id);        
        if (cart) {
            return res.status(200).json(cart);
        } else {
            return res.status(404).json('Carrito no encontrado');
        }
    } catch (error) {
        return res.status(500).json('Error al obtener el Carrito');
    }    
}

//agrega un product al carrito
export const addProductToCart = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;        
        const newProductInCart = await cartsService.addProductCart(idCart, idProduct);
        if(newProductInCart){
            return res.status(200).json(`Producto con el id: (${idProduct}), agregado con exito`);
        }else{
            return res.status(404).json('Carrito o producto no encontrado verifique los datos ingresados');
        }        
    } catch (error) {
        return res.status(500).json('Error al agregar producto al carrito');
    }    
} 

//vacia el carrito
export const emptyCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cartDelete = await cartsService.emptyCart(cid)
        if(cartDelete.products.length === 0){            
            return res.status(200).json(`Se ha vaciado correctamente el carrito con el id: ${cid}`);
        } else {
            return res.status(404).json(`Carrito con id: ${cid}, no encontrado`);
        }
    } catch (error) {
        return res.status(500).json('Error al vaciar el carrito');
    }
}

//elimina el product del carrito
export const deleteProductToCart = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const cartDelete = await cartsService.deleteProductCart(idCart, idProduct)        
        if (cartDelete) {            
            return res.status(200).json(`se ha eliminado correctamente el producto con id: ${idProduct}, del carrito con el id: ${idCart}`);
        } else {
            return res.status(404).json('Carrito o producto no encontrado verifique los datos ingresados');
        }
    } catch (error) {
        return res.status(500).json('Error al borrar el producto del carrito');
    }
}

//actualiza quantity de los products
export const updateQuantityProductInCart = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const quantity = req.body.quantity        
        const updateQuantityProduct = await cartsService.updateProductInCart(idCart, idProduct, quantity);
        if (updateQuantityProduct) {            
            return res.status(200).json(`se ha actualizado correctamente el quantity del producto con id: ${idProduct}, del carrito con el id: ${idCart}`);
        } else {
            return res.status(404).json('Carrito o producto no encontrado verifique los datos ingresados');
        }
    } catch (error) {
        return res.status(500).json('Error al intentar actualizar el producto del carrito');
    }
}

//actualizar el carrito al insertar un array de products
export const addArrayInCart = async (req, res) => {
    try {
        const products = req.body; 
        const id = req.params.cid;
        const cart = await cartsService.insertArrayProductsIntoCart(id, products);        
        if (cart) {
            return res.status(200).json(`se ha actualizado correctamente el carrito con id: ${id}`);
        } else {
            return res.status(404).json('Carrito no encontrado');
        }
    } catch (error) {
        return res.status(500).json('Error al obtener el Carrito');
    }    
}