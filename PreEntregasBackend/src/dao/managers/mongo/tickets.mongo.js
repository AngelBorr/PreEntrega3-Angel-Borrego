import ticketsModel from "../../models/ticket.models.js";

class TicketsManager{
    constructor(){
        this.ticketsModel = ticketsModel
    }

    //crear ticket
    async createTicket(bodyTicket){
        const ticket = await this.ticketsModel.create(bodyTicket)
        return ticket
    }
    //trae a todos los ticket
    async getTickets(){
        const ticket = await this.ticketsModel.find()
        return  ticket;
    }

    //trae el ticket por el email
    async getTicketByEmail(email){
        const ticket = await this.ticketsModel.findOne({email})
        return ticket ;
    }
}

export default TicketsManager