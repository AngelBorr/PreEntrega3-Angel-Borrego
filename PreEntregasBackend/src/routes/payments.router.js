import { success, createOrder, receiveWebhook } from '../controllers/controller.payments.js';
import MyOwnRouter from './router.js';

export default class PaymentsRouter extends MyOwnRouter{
    init(){
        this.post('/create-order', ['USER', 'PREMIUM'], createOrder),

        this.get('/success', ['USER', 'PREMIUM'], success)

        this.get('/failure', ['USER', 'PREMIUM'], (req, res) => res.status(200).send('failure'))

        this.get('/pending', ['USER', 'PREMIUM'], (req, res) => res.status(200).send('pending'))

        this.post('/webhook', ['USER', 'PREMIUM'], receiveWebhook)
    }
}