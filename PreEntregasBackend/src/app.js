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
import sessionsRouter from './routes/sessions.router.js'
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import env from './config.js'

const app = express();

//data MONGODB
const PORT = env.port; 
const USER_MONGO = env.userMongo;
const PASS_MONGO = env.passMongo;
const DB_NAME = env.dbColecction;
const DB_CLUSTER =  env.dbCluster

//data session
const secret = env.secret

const rutaMongo = `mongodb+srv://${USER_MONGO}:${PASS_MONGO}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

//configuracion plantillas y handlebars
app.engine('handlebars', handlerbars.engine()); 
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
//configuracion Session
app.use(session({
    store: new MongoStore({
        mongoUrl: rutaMongo,
        ttl: 3600
    }),
    secret: `${secret}`,
    resave: false,
    saveUninitialized: false
}))
//configuracion passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session()); 

//configuracion express
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//rutas
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/sessions', sessionsRouter); 

//server en puerto 8080
const httpServer = app.listen(`${PORT}`, () => {
    displayRoutes(app);
    console.log('servidor escuchando en el puerto 8080')
})

//conection a mongoose server
mongoose.connect(rutaMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('conectado a mongo')).catch((err) => {console.error(err)});

//servidor con socket
const io = new Server(httpServer)

app.set('io', io);

io.on('connection', socket =>{
    console.log("Nuevo cliente conectado", socket.id);
    updateProducts(io);
    chatSocket(socket, io)   
    
}); 
