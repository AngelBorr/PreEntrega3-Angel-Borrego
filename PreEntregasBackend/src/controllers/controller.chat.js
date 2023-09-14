import ChatService from "../services/service.chat.js";

const chatService = new ChatService

//trae los mensajes
export const getMessageChat = async (req, res) => {
    try {
        const messages = await chatService.getMessagesChat();
        if(messages){
            req.logger.info(`Se solicita el mensaje: ${messages}`)
            res.status(200).send({result: 'success', messages: messages});
        }else{
            req.logger.error('se produjo un error al obtener los mensajes')
            res.status(400).send('se produjo un error al mostrar los mensajes')
        }
        
    } catch (error) {
        req.logger.fatal('No se pueden mostrar los mensajes')
        res.status(500).send({'No hay mensajes para mostrar': error.message});
    }
}

//envia los mensajes a mongo
export const addMessageChat = async (req, res) => {
    try {
        const { user, messages } = req.body;
        req.logger.debug(`se solicita guardar el mensaje: ${messages}, del usuario: ${user}`)
        const newMessage = await chatService.addMessagesChat(user, messages);
        if(newMessage){
            req.logger.info(`se guardan exitosamente los mensajes del usuario: ${user}`)
            res.status(200).send({result: 'success', message: newMessage});
        }else{
            req.logger.error(`Se produce un error al intentar guardar los mensajes del usuario: ${user}`)
            res.status(400).send("no se pudo guardar los mensajes, vuelve a intentarlo") 
        }
        
    } catch (error) {
        req.logger.fatal('Se produce un error al guardar los mensajes de chat')
        res.status(500).send({'Se produjo un error al traer los mensajes de los usuario': error.message});
    }
}