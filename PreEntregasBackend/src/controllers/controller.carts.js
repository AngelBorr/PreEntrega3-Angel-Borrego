import CartService from "../services/service.carts.js";
import TicketService from "../services/service.tickets.js";

const cartsService = new CartService
const ticketService = new TicketService

//crea un carrito
export const createCart = async (req, res) => {
    try {        
        const newCart = await cartsService.addCarts();               
        if(newCart){
            req.logger.info(`Se ha creado correctamente el carrito con el id: ${newCart._id}`)
            return res.status(200).json(newCart);
        }else{
            req.logger.error('No pudo crearse existosamente el carrito nuevo')
            return res.status(404).json(`No pudo crearse con exito un nuevo carrito`);
        }
        
    } catch (error) {
        req.logger.fatal('Error al intentar crear un carrito, ' + error)
        return res.status(500).json(`Error al intentar crear el carrito`, error);
    }
}

//muestra cada carrito con sus productos
export const getDataCartById = async (req, res) => {
    try {
        const id = req.params.cid;
        const cart = await cartsService.getCartById(id);
        req.logger.debug(`se solicita el carrito con el id: ${id}`)
        if (cart) {
            req.logger.info(`se hace la solicitud del carrito con el id: ${id}`)
            return res.status(200).json(cart);
        } else {
            req.logger.error(`No se ha encontrado el carrito con el id: ${id}, verifique los datos ingresados`)
            return res.status(404).json('Carrito no encontrado');
        }
    } catch (error) {
        req.logger.fatal('Error al obtener el Carrito')
        return res.status(500).json('Error al obtener el Carrito');
    }    
}

//agrega un product al carrito
export const addProductToCart = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const user = req.user
        req.logger.debug(`Se realiza la incorporacion del producto con el id: ${idProduct}, al carrito con el id: ${idCart}`)
        const newProductInCart = await cartsService.addProductCart(user, idCart, idProduct);
        if(newProductInCart){
            req.logger.info(`Se agrego correctamente el productos con id: ${idProduct}, al carrito con el id: ${idCart}`)
            return res.status(200).json(`Producto con el id: (${idProduct}), agregado con exito`);
        }else{
            req.logger.error(`Se produjo un error al intentar insertar el producto con el id: ${idProduct}, en el carrito con el id: ${idCart}`)
            return res.status(404).json('Carrito o producto no encontrado verifique los datos ingresados');
        }    
    } catch (error) {
        req.logger.fatal('Se produjo un error al intentar agregar un producto al carrito')
        return res.status(500).json('Error al agregar producto al carrito');
    }    
} 

//vacia el carrito
export const emptyCart = async (req, res) => {
    try {
        const { cid } = req.params;
        req.logger.debug(`Se solicita vaciar el carrti con el id: ${cid}`)
        const cartDelete = await cartsService.emptyCart(cid)
        if(cartDelete.products.length === 0){
            req.logger.info(`se realizo exitosamente la operacion de vacio en el carrito con el id: ${cid}`)
            return res.status(200).json(`Se ha vaciado correctamente el carrito con el id: ${cid}`);
        } else {
            req.logger.error(`Se produjo un error al intentar vaciar el carrito con el id: ${cid}`)
            return res.status(404).json(`Carrito con id: ${cid}, no encontrado`);
        }
    } catch (error) {
        req.logger.fatal('Error al vaciar el carrito, verifique que los datos ingresados sean los correctos')
        return res.status(500).json('Error al vaciar el carrito');
    }
}

//elimina el product del carrito
export const deleteProductToCart = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        req.logger.debug(`se solicita eliminar el productos con id: ${idProduct}, del carrito con el id: ${idCart}`)
        const cartDelete = await cartsService.deleteProductCart(idCart, idProduct)        
        if (cartDelete) {
            req.logger.info(`Se ha eliminado correctamente el productos con el id: ${idProduct}, del carrito con el id: ${idCart}`)
            return res.status(200).json(`se ha eliminado correctamente el producto con id: ${idProduct}, del carrito con el id: ${idCart}`);
        } else {
            req.logger.error(`Se ha producido un error al intentar eliminar el productos con el id: ${idProduct}, del carrito con el id: ${idCart}`)
            return res.status(404).json('Carrito o producto no encontrado verifique los datos ingresados');
        }
    } catch (error) {
        req.logger.fatal('Se produjo un error al querer borrar un producto del carrito')
        return res.status(500).json('Error al borrar el producto del carrito');
    }
}

//actualiza quantity de los products
export const updateQuantityProductInCart = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const quantity = req.body.quantity
        req.logger.debug(`se actualiza quantity a: ${quantity} del producto con el id: ${idProduct}, del carrito con el id: ${idCart}`)
        const updateQuantityProduct = await cartsService.updateProductInCart(idCart, idProduct, quantity);
        if (updateQuantityProduct) {
            req.logger.info(`Se realiza la actualizacion correcta de quantity del producto con el id: ${idProduct}, del carrito con el id: ${idCart}`)
            return res.status(200).json(`se ha actualizado correctamente el quantity del producto con id: ${idProduct}, del carrito con el id: ${idCart}`);
        } else {
            req.logger.error(`Se produjo un error al intentar cambiar la quantity del producto con el id: ${idProduct}, del carrito con el id: ${idCart}`)
            return res.status(404).json('Carrito o producto no encontrado verifique los datos ingresados');
        }
    } catch (error) {
        req.logger.fatal('Error al intentar actualizar la quantity de un producto del carrito')
        return res.status(500).json('Error al intentar actualizar la quantity de un producto del carrito');
    }
}

//actualizar el carrito al insertar un array de products
export const addArrayInCart = async (req, res) => {
    try {
        const products = req.body; 
        const id = req.params.cid;
        req.logger.debug(`Productos a insertar: ${products}, al carrito con el id: ${id} `)
        const cart = await cartsService.insertArrayProductsIntoCart(id, products);        
        if (cart) {
            req.logger.info(`Se han insertado correctamente los productos en el carrito con el id: ${id}`)
            return res.status(200).json(`se ha actualizado correctamente el carrito con id: ${id}`);
        } else {
            req.logger.error(`Se produjo un error al insertar los productos en el carrito con el id: ${id}`)
            return res.status(404).json('Carrito no encontrado');
        }
    } catch (error) {
        req.logger.fatal('Se produjo un error al inserta los productos al carrito')
        return res.status(500).json('Error al insertar un array de productos en el Carrito');
    }    
}

//confirmacion de compra
export const confirmBuy = async(req, res) =>{
    try {
        const user = req.body
        req.logger.debug(`Se realiza la confirmacion de compra del usuario: ${user}`)
        const ticket = await ticketService.create(user)
        req.logger.info(`Se realiza exitosamente la creacion del ticket con el id: ${ticket._id}`)
        return res.status(200).send('La creacion del ticket fue exitosa')
    } catch (error) {
        req.logger.fatal(`Se ha producido un error en la creacion del ticket del usuario: ${user}`)
        return res.status(500).json('Error al mandar el usuario');
    }
    
}