import DaosFactory from "../dao/factory.js";

const ticketManager = new DaosFactory
const tickets = ticketManager.TicketDao()

class TicketsRepository{
    constructor(){}

    async createTicket(bodyTycket){
        const ticket = await tickets.createTicket(bodyTycket)
        return ticket
    }

    async getTickets(){
        const data = await tickets.getTickets()
        return data
    }

    async getTicketByEmail(email){
        const ticket = await tickets.getTicketByEmail(email)
        return ticket

    }
}

export default TicketsRepository