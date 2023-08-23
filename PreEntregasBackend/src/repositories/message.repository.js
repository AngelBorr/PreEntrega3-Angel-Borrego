import DaosFactory from "../dao/factory.js";

const messagesManager = new DaosFactory
const message = messagesManager.MessagesDao()

class MessageRepository{    
    constructor(){}

    async getMessages(){        
        const messages = await message.getMessages();        
        return messages
    }
    
    async addMessages(user, messages){
        const messagesUser = await message.addMessages(user, messages)
        return messagesUser
    }    
}

export default MessageRepository