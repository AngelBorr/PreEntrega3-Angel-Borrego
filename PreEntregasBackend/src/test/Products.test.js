import mongoose from 'mongoose'
import Assert from 'assert'
import ProductsService from '../services/service.products.js'
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

describe('Testing Products Dao', () => {
    before(function(){
        this.productService = new ProductsService
    })
    beforeEach(function(){
        this.timeout(5000)
    })
    it('El get debera poder traer un objeto tipo Mongo con todos los productos existentes', async function() {
        const result = await this.productService.getProducts()
        assert.strictEqual(typeof result, 'object')
    })
    it('El get id debera poder traer un objeto que se identifique con el id proporsionado', async function(){
        const id = '64a591778ba0148e350a0f58'
        const result = await this.productService.getProductById(id)
        assert.strictEqual(typeof result, 'object')
    })
    it('El post debera poder crear un producto tipo objeto', async function(){
        const req = {}
        const newProduct = {
            title: 'Medias Arbitro',
            description: '100% algodon, color: Negro',
            price: 2500,
            thumbnail: 'sin imagen',
            code: 'R-888',
            stock: 20,
            status: true,
            category: 'indumentaria'
        }
        req.body = newProduct
        const user = {}
        user.email = 'arturo@gmail.com'
        req.user = user
        const result = await this.productService.addProduct(req)
        assert.ok(result._id)
    })
    //estos metodos necesitan establecer el role para que funcionen correctamente
    /* it('El put debera poder actualizar el valor de las propiedades del producto indicado por su id', async function(){
        const id = '651b3524c3896591ddd8b171'
        const updateBodyProduct = {
            price: 3000,            
            stock: 10
        }
        const result = await this.productService.updateProduct(id, updateBodyProduct)
        assert.deepStrictEqual(result.modifiedCount, 1)
    })
    it('El delete debera poder eliminar el producto solicitado por su id', async function(){               
        const id = '651b3524c3896591ddd8b171'
        const result = await this.productService.deleteProduct(id)
        assert.deepStrictEqual(result.deletedCount, 1)
    }) */
    
})