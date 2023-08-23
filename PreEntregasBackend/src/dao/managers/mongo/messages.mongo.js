import messageModel from "../../models/message.models.js";

class MessageManager{
    constructor(){
        this.messageModel = messageModel
    }

    //traigo los mensajes
    getMessages(){
        const messages = this.messageModel.find()
        return messages
    }

    //guardo los mensajes
    addMessages(user, message){
        const newMessage = this.messageModel.create({ user, message })
        return newMessage
    }
}

export default MessageManager