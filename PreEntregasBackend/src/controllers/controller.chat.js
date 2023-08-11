import ChatService from "../services/service.chat.js";

const chatService = new ChatService

//trae los mensajes
export const getMessageChat = async (req, res) => {
    try {
        const messages = await chatService.getMessagesChat();
        if(messages){
            res.status(200).send({result: 'success', messages: messages});
        }else{
            res.status(400).send('se produjo un error al mostrar los mensajes')
        }
        
    } catch (error) {
        res.status(500).send({'No hay mensajes para mostrar': error.message});
    }
}

//envia los mensajes a mongo
export const addMessageChat = async (req, res) => {
    try {
        const { user, messages } = req.body;
        const newMessage = await chatService.addMessagesChat(user, messages);
        if(newMessage){
            res.status(200).send({result: 'success', message: newMessage});
        }else{
            res.status(400).send("no se pudo guardar los mensajes, vuelve a intentarlo") 
        }
        
    } catch (error) {
        res.status(500).send({'Se produjo un error al traer los mensajes de los usuario': error.message});
    }
}