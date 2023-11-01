import env from '../config.js'
import CartService from '../services/service.carts.js'
import mercadopago from 'mercadopago'

const cartsService = new CartService

export const createOrder = async (req, res) => {
    try {
        mercadopago.configure({
            access_token: env.tokenMp
        })
        const cartId = req.user.cart
        const cart = await cartsService.getCartById(cartId)
        const result = await mercadopago.preferences.create({
            items: [...cart.products].map((item) => {
                return {
                    title: item.product.title,
                    unit_price: item.product.price,
                    quantity: item.quantity,
                    currency_id: 'ARS'
                } 
            }),
            back_urls:{
                success: `${env.baseUrl}${env.port}/api/payments/success`,
                failure: `${env.baseUrl}${env.port}/api/payments/failure`,
                pending: `${env.baseUrl}${env.port}/api/payments/pending`
            },
            notification_url: `${env.baseUrl}${env.port}/api/payments/webhook`
        })
        res.status(200).json(result.body) 
    } catch (error) {
        req.logger.fatal('Error al intentar crear la session en stripe, ' + error)
        return res.status(500).json(`Error al intentar crear la session en stripe`, error);
    }
}

export const receiveWebhook = async (req, res) => {
    try {
        const payment = req
        if(payment.type === 'payment'){
            const data = await mercadopago.payment.findById(payment['data.id'])
        }
        res.status(204)        
    } catch (error) {
        req.logger.fatal('Error al intentar crear el status de la session en stripe, ' + error)
        return res.status(500).json(`Error al intentar crear el status de la session en stripe`, error);
    }
}

export const success = async (req, res) => {
    try {
        const payment = req
        /* if(payment.type === 'payment'){
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data)
        }
        res.status(204)  */       
    } catch (error) {
        req.logger.fatal('Error al intentar crear el status de la session en stripe, ' + error)
        return res.status(500).json(`Error al intentar crear el status de la session en stripe`, error);
    }
}