import ProductManager from '../dao/productsManager.js';
import CartsManager from '../dao/cartsManagerMongo.js';
import { Router, json } from 'express';

const manager = new ProductManager;
const cartManager = new CartsManager

const router = Router ();

//configuracion vistas publicas y privadas
const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/products');
    next();
}
const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
}

// vista estatica contiene la lista de productos
router.get('/products', privateAccess, async (req, res) =>{
    try {
        const {limit = 5, page = 1, sort='desc', category=''} = req.query;       
        const {products, hasPrevPage, hasNextPage, nextPage, prevPage} = await manager.getProducts(limit, page, sort, category);        
        
        if(!products){
            return res.status(404).render("El listado de productos esta vacio.");
        }else{
            res.status(200).render('products', {
                products: products,
                user: req.session.user,
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "ProductsList",
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage
            })            
        }        
    } catch (error) {
        return res.status(500).render('Error al obtener los producto desde products.json');
    }    
});

// vista estatica contiene la lista del carrito
router.get('/carts/:cid', privateAccess, async (req, res) =>{
    try {
        const idCart = req.params.cid
        const cart = await cartManager.getCartById(idCart);        
        if(!cart){
            return res.status(404).render("El carrito esta vacio.");
        }else{
            res.status(200).render('cart', {
                cart: cart,
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "CartList", 
            })            
        }        
    } catch (error) {
        return res.status(500).render('Error al obtener los producto desde products.json');
    }    
});

// vista con formulario conectado a la ruta post de products.router.js
//este formulario otorga el newProduct a req.body de la ruta post de products.router
router.get('/addProducts', privateAccess, async (req, res) =>{    
    try {
        res.status(200).render('formAddProducts', {
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "formAddProducts"
            }); 
    } catch (error) {
        return res.status(500).render('Error al obtener los producto desde products.json');
    }    
});

//ruta handlebars con socket contiene planilla que nuestra en tiempo real los productos
router.get('/realtimeproducts', privateAccess, async (req, res) => {
    try {
        res.status(200).render('realTimeProducts', {
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "realTimeProducts"
            });        
        
    } catch (error) {
        return res.status(500).render('Error al obtener los producto desde products.json');
    } 
})
//ruta chat
router.get('/chat', (req, res) => {
    try {
        res.status(200).render('chat')
    } catch (error) {
        return res.status(500).render('Error al obtener los messages desde la base de datos');
    }
})
//ruta register user
router.get('/register', publicAccess, async (req, res) => {
    try {
        res.status(200).render('registerUser', {
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "RegisterUser"
            }); 
    } catch (error) {
        return res.status(500).render('Error al renderizar el resgistro de usuarios');
    }
})
//ruta login user
router.get('/login', publicAccess, async (req, res) => {
    try {
        res.status(200).render('loginUser', {
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "loginUser"
            }); 
    } catch (error) {
        return res.status(500).render('Error al renderizar el login');
    }
})


export default router