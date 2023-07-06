import messageModel from './models/message.models.js';

class MessageManager {
    messageModel;
    constructor(){
        this.messageModel = messageModel
    }
    async getMessages() {
        try {
        const messages = await messageModel.find();
        return messages;
        } catch (error) {
        throw new Error(`Se produjo un error al traer los mensajes desde Mongo: ${error.message}`);
        }
    }

    async addMessage(user, message) {
        try {            
            const newMessage = await messageModel.create({ user, message });
            return newMessage;
        } catch (error) {
        throw new Error(`Se produjo un error al intentar guardar los mensajes en Mongo: ${error.message}`);
        }
    }
}

export default MessageManager