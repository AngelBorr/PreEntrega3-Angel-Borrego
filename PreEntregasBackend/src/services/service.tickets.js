import TicketsRepository from "../repositories/ticket.repository.js";
import CustomError from "./errors/customError.js";
import EErrors from "./errors/enums.js";
import { generateTicketErrorInfo } from "./errors/info.js";
import CartService from "./service.carts.js";

const cartService = new CartService

class TicketService{
    constructor(){
        this.tickets = new TicketsRepository
    }

    async create(bodyTicket){
        try {
            const user = bodyTicket          
            const cart = await cartService.getCartById(user.cart)         
            const amount = cart.total
            const generateRandomNumber = () => {
                const randomNumber = Math.floor(Math.random() * 100000) + 1
                return randomNumber
            }
            const code = generateRandomNumber()
            const purchase_datetime = new Date
            if(!code || !purchase_datetime || !amount || !user.email){
                console.log('error')
                CustomError.createError({
                    name: 'Products Creation Error',
                    cause: generateTicketErrorInfo({code, purchase_datetime, amount, purchaser}),
                    code: EErrors.INVALID_TYPES_ERROR,
                    message: 'Error trying to create a new Products'
                });
            } 
            const newTicket = {
                code: code,
                purchase_datetime: purchase_datetime,
                amount: amount,
                purchaser: user.email
            }
            const dataTicket = await this.tickets.createTicket(newTicket)
            let prodSinStock = []
            const products = cart.products
            for (let i = 0; i < products.length; i++) {
                let prod = products[i]
                if(prod.stock === 0){
                    prodSinStock.push(prod)
                }                
            }
            if(prodSinStock.length > 0){
                await cartService.emptyCart(cart._id)
                await cartService.insertArrayProductsIntoCart(cart._id, prodSinStock)
            }else{
                await cartService.emptyCart(cart._id)
            }
            return dataTicket
        } catch (error) {
            throw new Error("Se produjo un error al crear el Ticket");
        }

    }

    async get(){
        try {
            const data = await this.tickets.getTickets()
            return data
        } catch (error) {
            throw new Error("Se produjo un error al obtener todos los tickets");
        }

    }

    async getByEmail(email){
        try {
            if(!email){
                console.log('error')
                CustomError.createError({
                    name: 'Products Creation Error',
                    cause: generateTicketErrorInfo({purchaser}),
                    code: EErrors.INVALID_TYPES_ERROR,
                    message: 'Error trying to create a new Products'
                });
            } 
            const data = await this.tickets.getTicketByEmail(email)
            return data
        } catch (error) {
            throw new Error(`Se produjo un error al obtener el Ticket del usuario: ${email}`);
        }

    }
}

export default TicketService