import fs from 'fs'

class TicketManagerFile{
    constructor(){
        this.tickets = [];
        this.pathTicket = './assets/ticket.json'
    }
    //generador de id
    generateIdTicket(){
        let id = this.tickets.length > 0 ? this.tickets[this.tickets.length - 1].id + 1 : 1;
        return id;
    }

    //generardor de code
    generateCode(){
        let code = this.tickets.length > 0 ? this.tickets[this.tickets.length - 1].code + 1 : 1;
        return code;
    }

    //crea el ticket
    async createTicket(bodyTicket){
        const path = await fs.promises.readFile(this.pathTicket, 'utf8')
        if(!path){
            await fs.promises.writeFile(this.pathTicket, '[]')
            return []
        }
        const newTicket = {
            id: this.generateIdTicket(),
            code: this.generateCode(),
            ...bodyTicket
        }
        this.tickets.push(newTicket)
        await fs.promises.writeFile(this.pathTicket, JSON.stringify(this.tickets), 'utf8')
        return this.tickets
    }

    //trae a todos los ticket
    async getTickets(){
        const tickets = await fs.promises.readFile(this.pathTicket, 'utf8')
        const ticketsJson = JSON.parse(tickets)
        return ticketsJson
    }

    //trae el ticket por el email
    async getTicketByEmail(email){
        const data = await this.getTickets()
        const ticket = data.find(tickets => tickets.email === email)
        return ticket
    }

}

export default TicketManagerFile