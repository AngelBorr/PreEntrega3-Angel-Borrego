import ProductManager from '../productsManager.js';
import { Router } from 'express';

const manager = new ProductManager;

const router = Router ();

// vista estatica contiene la lista de productos
router.get('/', async (req, res) =>{
    try {
        const products = await manager.getProducts();
        if(!products){
            return res.status(404).render("El listado de productos esta vacio.");
        }else{
            res.status(200).render('home', {products,
                style:"index.css",
                styleBoostrap:"bootstrap.min.css",
                title: "ProductsList"
            });
        }       
        
    } catch (error) {
        return res.status(500).render('Error al obtener los producto desde products.json');
    }   
    
});

// vista con formulario conectado a la ruta post de products.router.js
//este formulario otorga el newProduct a req.body de la ruta post de products.router
router.get('/addProducts', async (req, res) =>{
    
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
router.get('/realtimeproducts', async (req, res) => {
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

export default router