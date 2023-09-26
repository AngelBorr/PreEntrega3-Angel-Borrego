import express, { response } from 'express';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import handlerbars from 'express-handlebars';
import __dirname, { specs } from './utils.js'
import ViewRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import { chatSocket, updateProducts } from './public/js/socket.js';
import mongoose from 'mongoose';
import displayRoutes from "express-routemap";
import ChatRouter from './routes/chat.router.js'
import SessionsRouter from './routes/sessions.router.js'
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import env from './config.js'
import errorHandler from './middlewares/errors/errors.index.js'
import { addLogger } from './middlewares/logger/logger.js';
import LoggerRouter from './routes/loggers.router.js';
import swaggerUiExpress from 'swagger-ui-express'

const viewRouter = new ViewRouter();
const chatRouter = new ChatRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const sessionsRouter = new SessionsRouter();
const loggerRouter = new LoggerRouter();

const app = express();
app.use(addLogger);

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

//config swagger
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

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
app.use(passport.session())

//configuracion express
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//rutas
app.use('/', viewRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use('/api/chat', chatRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/loggerTest', loggerRouter.getRouter())

//server en puerto 8080
const httpServer = app.listen(`${PORT}`, () => {
    displayRoutes(app);
    console.log('servidor escuchando en el puerto 8080')
})

//conection a mongoose server
mongoose.connect(rutaMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('conectado a mongo')).catch((err) => {console.log(err)});

//servidor con socket
const io = new Server(httpServer)

app.set('io', io);

io.on('connection', socket =>{
    console.log("Nuevo cliente conectado", socket.id);
    updateProducts(io);
    chatSocket(socket, io)   
    
});

app.use(errorHandler)