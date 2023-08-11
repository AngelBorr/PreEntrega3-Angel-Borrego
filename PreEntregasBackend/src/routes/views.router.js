import { Router } from 'express';
import { getViewCartById, getViewChat, getViewFormularyProducts, getViewHandlebarsProducts, getViewLoginUser, getViewProducts, getViewRegisterUser, getViewResetPass, privateAccess, publicAccess } from '../controllers/controller.views.js';

const router = Router ();

// vista estatica contiene la lista de productos
router.get('/products', privateAccess, getViewProducts);

// vista estatica contiene la lista del carrito
router.get('/carts/:cid', privateAccess, getViewCartById);

// vista con formulario conectado a la ruta post de products.router.js
//este formulario otorga el newProduct a req.body de la ruta post de products.router
router.get('/addProducts', privateAccess, getViewFormularyProducts);

//ruta handlebars con socket contiene planilla que nuestra en tiempo real los productos
router.get('/realtimeproducts', privateAccess, getViewHandlebarsProducts)

//ruta chat
router.get('/chat', getViewChat)

//ruta register user
router.get('/register', publicAccess, getViewRegisterUser)

//ruta login user
router.get('/login', publicAccess, getViewLoginUser)

//ruta resetPassword
router.get('/resetPassword', publicAccess, getViewResetPass)

export default router