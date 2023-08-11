import MessageManager from "../dao/managers/messages.mongo.js";

class ChatService{
    constructor(){
        this.chats = new MessageManager
    }

    //trae todos los mensajes del chat
    async getMessagesChat(){
        try {
            const messages = await this.chats.getMessages()
            return messages
        } catch (error) {
            throw new Error(`Se produjo un error al traer los mensajes desde Mongo: ${error.message}`);
        }
    }

    //guarda los mensages del chat
    async addMessagesChat(user, message){
        try {
            const newMessage = await this.chats.addMessages(user, message)
            return newMessage
        } catch (error) {
            throw new Error(`Se produjo un error al intentar guardar los mensajes en Mongo: ${error.message}`);
        }
    }

}

export default ChatService