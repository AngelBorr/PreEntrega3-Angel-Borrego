import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlerbars from 'express-handlebars';
import __dirname from './utils.js'
import CartsManager from './cartsManager.js';
import ProductManager from './productsManager.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import { updateProducts } from './public/js/socket.js';

const carts = new CartsManager;
const manager = new ProductManager;

const app = express();

//configuracion plantillas y handlebars
app.engine('handlebars', handlerbars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter);



//configuracion express
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//server en puerto 8080
const httpServer = app.listen(8080, () => {
    console.log('servidor escuchando en el puerto 8080')
})

//para poder utilizar socket hay que declarar el entorno http siempre antes de llamr a socket
//creando un servidor con socket
const io = new Server(httpServer)

app.set('io', io);

//servidor con socket
io.on('connection', socket =>{
    console.log("Nuevo cliente conectado", socket.id);
    updateProducts(io)
    
});
