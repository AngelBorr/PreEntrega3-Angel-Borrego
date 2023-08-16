import ProductsService from "../services/service.products.js";
import CartService from "../services/service.carts.js";

const productsService = new ProductsService
const cartsService = new CartService

//configuracion vistas publicas y privadas
export const publicAccess = async (req, res, next) => {
    if (req.session.user) return res.redirect('/products');
    next();
}

export const privateAccess = async (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
}

//vista products contiene lista de productos
export const getViewProducts = async (req, res) =>{
    try {        
        const {limit = 5, page = 1, sort='desc', category=''} = req.query;       
        const {products, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsService.getProducts(limit, page, sort, category);        
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
}

//vista cart contiene la lista del carrito
export const getViewCartById = async (req, res) =>{
    try {
        const idCart = req.params.cid
        const cart = await cartsService.getCartById(idCart);        
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
}

//vista formulario agregar products
export const getViewFormularyProducts = async (req, res) =>{    
    try {
        res.status(200).render('formAddProducts', {
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "formAddProducts"
            }); 
    } catch (error) {
        return res.status(500).render('Error al obtener los producto desde products.json');
    }    
}

//vista handlebars con socket muestra planilla products
export const getViewHandlebarsProducts = async (req, res) => {
    try {
        res.status(200).render('realTimeProducts', {
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "realTimeProducts"
            });        
        
    } catch (error) {
        return res.status(500).render('Error al obtener los producto desde products.json');
    } 
}

//vista chat
export const getViewChat = (req, res) => {
    try {
        res.status(200).render('chat')
    } catch (error) {
        return res.status(500).render('Error al obtener los messages desde la base de datos');
    }
}

//vista registro usuarios
export const getViewRegisterUser = async (req, res) => {
    try {
        res.status(200).render('registerUser', {
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "RegisterUser"
            }); 
    } catch (error) {
        return res.status(500).render('Error al renderizar el resgistro de usuarios');
    }
}

//vista login
export const getViewLoginUser = async (req, res) => {
    try {
        res.status(200).render('loginUser', {
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "loginUser",
                imgSrc:'/img/github.png'
            }); 
    } catch (error) {
        return res.status(500).render('Error al renderizar el login');
    }
}

//vista resetPassword
export const getViewResetPass = async (req, res) => {
    try {
        res.status(200).render('resetPassword', {
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "resetPassword"
            }); 
    } catch (error) {
        return res.status(500).render('Error al renderizar resetPassword');
    }
}