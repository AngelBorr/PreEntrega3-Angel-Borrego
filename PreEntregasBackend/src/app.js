import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlerbars from 'express-handlebars';
import __dirname from './utils.js'
import CartsManager from './cartsManager.js';
import ProductManager from './productsManager.js';
import viewsRouter from './routes/views.router.js'

const carts = new CartsManager;
const manager = new ProductManager;

const app = express();

app.engine('handlebars', handlerbars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const server = app.listen(8080, () => {
    console.log('servidor escuchando en el puerto 8080')
})
