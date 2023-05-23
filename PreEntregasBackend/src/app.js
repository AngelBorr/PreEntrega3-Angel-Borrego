import express from 'express';
import ProductManager from './products.js';

const app = express();

const manager = new ProductManager;

//trae los productos con send desde el json
app.get('/products', (req, res) => {
    (async () => {
        try {
            res.send(await manager.getProducts());
            return `Producto en server`;
        } catch (error) {
            throw new Error('No se pudo mostrar productos en el server')
        }
    })();    
    
});

app.get('/products/:id', (req, res) => {    
    (async () => {
        try {
            const productId = Number(req.params.id);
            const product = await manager.getProductById(productId);
            console.log(product)
            if (product) {
            return res.send(product);
            } else {
            return res.status(404).send('Producto no encontrado');
            }
        } catch (error) {
            return res.status(500).send('Error al obtener el producto');
        }
    })();
});

app.listen(5000, () => {
    console.log('servidor escuchando en el puerto 5000')
})
