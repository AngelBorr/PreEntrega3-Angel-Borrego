import ProductManager from '../productsManager.js';
import { Router } from 'express';

const manager = new ProductManager;

const router = Router ();

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

router.get('/addProducts', async (req, res) =>{
    //este formulario otorga el newProduct a req.body de la ruta post de products.router
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

export default router