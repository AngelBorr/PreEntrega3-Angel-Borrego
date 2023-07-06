import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlerbars from 'express-handlebars';
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import { chatSocket, updateProducts } from './public/js/socket.js';
import mongoose from 'mongoose';
import displayRoutes from "express-routemap";
import chatRouter from './routes/chat.router.js'

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
app.use('/api/chat', chatRouter);

//server en puerto 8080
const httpServer = app.listen(8080, () => {
    displayRoutes(app);
    console.log('servidor escuchando en el puerto 8080')
})

//conection a mongoose server
const USER_MONGO = "angel3";
const PASS_MONGO = "FPJQI2hsDZFwif90";
const DB_NAME = "Ecommerce";

const rutaMongo = `mongodb+srv://${USER_MONGO}:${PASS_MONGO}@cluster0.wd5qrnn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(rutaMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('conectado a mongo')).catch((err) => {console.error(err)});

const io = new Server(httpServer)

app.set('io', io);

//base de datos message
const messages = []

//servidor con socket
io.on('connection', socket =>{
    console.log("Nuevo cliente conectado", socket.id);
    updateProducts(io);
    chatSocket(socket, io)   
    
});
