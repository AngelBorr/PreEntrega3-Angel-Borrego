import express from 'express';
import fs from 'fs'
import ProductManager from './products.js';

const app = express();

const manager = new ProductManager;



/* let ruta = './assets/products.json'

const getData = () => {
    const getProductsJson = async () => {
        try {
            const data = await fs.promises.readFile(ruta, 'utf8');            
            return data
            
        } catch (error) {
            throw new Error('Se produjo un error al mostrar los datos desde el Json')
        }
    }

    return getProductsJson()
} */



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

app.listen(5000, () => {
    console.log('servidor escuchando en el puerto 5000')
})