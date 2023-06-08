import ProductManager from '../productsManager.js';
import { Router } from 'express';
import fs from 'fs';

const router = Router();

const manager = new ProductManager;
//const productsData = manager.products;

//traer todos los products
router.get('/', async (req, res) => {
    try {
        res.send(await manager.getProducts());
        return `Productos en server`;
    } catch (error) {
        throw new Error('No hay Productos para mostrar')
    }    
    
});
// debera traer solamente el producto solicitado con el id del producto
router.get('/:id', async (req, res) => {    
    try {
        const productId = req.params.id;
        const product = await manager.getProductById(productId);        
        if (product) {
        return res.send(product);
        } else {
        return res.status(404).send(`Producto no encontrado con el id: ${productId}`);
        }
    } catch (error) {
        return res.status(500).send(`Error al obtener el producto con el id: ${productId}, verifique los datos`);
    }   
});

// crear ruta post que debera agregar un producto con todos los campos (propiedades)
//ahora la ruta post recibe el producto desde formAddProducts.handlebars

router.post('/', async (req, res) => {   
    try {
        const newProduct = req.body
        
        const product = await manager.addProduct(newProduct);
        const productInProducts = await manager.getProducts();
        
        const productConfirm = productInProducts.find(p => p.code === product.code)
        if (productConfirm) {
        return res.send({status:"success"});
        } else {
        return res.status(404).send(`El producto no pudo agregrarse con exito`);
        }
    } catch (error) {
        return res.status(500).send(`Error al obtener el producto, verifique los datos`);
    }   
});

// la ruta put debera actualizar las propiedades del productos con los campos dados desde el body
router.put('/:id', async (req, res) => {
        
    try {
        const productId = Number(req.params.id);
        
        const dataToUpdate = req.body;
        const productsData = await manager.getProducts();
        
        let product = productsData.find(p => Number(p.id) === productId);
                        
        if (!product) {
            return res.status(404).send('Producto no encontrado y/o inexistente');
                    
        } else {
            product = {...product, ...dataToUpdate};
            
            try {
                const productIndex = productsData.findIndex(prod => prod.id === product.id);
                
                if (productIndex === -1) {
                    throw new Error(`No se encontró ningún producto con el ID ${id}.`);
                }
            
                productsData[productIndex] = {
                    ...productsData[productIndex],
                    ...product
                };

                await fs.promises.writeFile(manager.path, JSON.stringify(productsData, 'utf8'));        
                res.send({status: "success"})
            } catch (error) {
                throw new Error(`Error al actualizar el producto: ${error.message}`);
            }
                    
        }
    } catch (error) {
        return res.status(500).send('Error al obtener el producto desde la base de datos');
    }   
});
//debera eliminar el producto con el id indicado
router.delete('/:id', async (req, res) => {    
    try {
        const productId = Number(req.params.id);
        const product = await manager.deleteProduct(productId);        
        if (product) {
        return res.send(`${product}, eliminado correctamente`);
        } else {
        return res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        return res.status(500).send('Error al borrar el producto');
    }   
});

export default router

