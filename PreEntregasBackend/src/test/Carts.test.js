import mongoose from 'mongoose'
import Assert from 'assert'
import CartService from '../services/service.carts.js'
import env from '../config.js'

const USER_MONGO = env.userMongo;
const PASS_MONGO = env.passMongo;
const DB_NAME = env.dbColecction;
const DB_CLUSTER =  env.dbCluster

const rutaMongo = `mongodb+srv://${USER_MONGO}:${PASS_MONGO}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(rutaMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('conectado a mongo')).catch((err) => {console.log(err)});

const assert = Assert.strict

describe('Testing Carts Dao', () => {
    before(function(){
        this.cartService = new CartService
    })
    beforeEach(function(){
        this.timeout(5000)
    })
    it('El get debera poder traer un array con todos los cart existentes', async function() {
        const result = await this.cartService.getCarts()
        assert.strictEqual(Array.isArray(result), true)
    })
    it('El get id debera poder traer un objeto que se identifique con el id proporsionado', async function(){
        const id = '64f8a081c938ebcabf5c73e9'
        const result = await this.cartService.getCartById(id)
        assert.strictEqual(typeof result, 'object')
    })
    it('El post debera poder crear un carrito tipo objeto', async function(){
        const result = await this.cartService.addCarts()
        assert.strictEqual(typeof result, 'object')
    })
    it('El post debera poder incorporar el producto indicado por su id, al carrito solicitado', async function(){
        const user = {}
        user.email = 'angel_borr@hotmail.com'
        const cartId = '651af939dc84d3650abebe7b'
        const productId = '64a590ef8ba0148e350a0f4c'
        const result = await this.cartService.addProductCart(user, cartId, productId)
        assert.strictEqual(typeof result, 'object')
    })
    it('El delete debera poder eliminar el carrito solicitado por su id', async function(){
        const carts = await this.cartService.getCarts()
        const cart = carts[carts.length - 1]        
        const idCart = cart._id
        const result = await this.cartService.deleteCart(idCart)
        assert.strictEqual(typeof result, 'object')
    })
    it('El put debera poder vaciar el carrito solicitado por su id', async function(){
        const idCart = '651af939dc84d3650abebe7b'        
        const result = await this.cartService.emptyCart(idCart)
        assert.strictEqual(typeof result, 'object')
    })
})