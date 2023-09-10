import TicketsRepository from "../repositories/ticket.repository.js";
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
            const data = await this.tickets.getTicketByEmail(email)
            return data
        } catch (error) {
            throw new Error(`Se produjo un error al obtener el Ticket del usuario: ${email}`);
        }

    }
}

export default TicketService