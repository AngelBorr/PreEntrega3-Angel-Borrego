import ProductsService from "../../services/service.products.js";
import ChatService from "../../services/service.chat.js";

const chatService = new ChatService
const productsService = new ProductsService

const updateProducts = async (io) => {
    const products = await productsService.getProducts()
    io.emit('updateProducts', products);
    
}

const chatSocket = async (socket, io) => {
    socket.on('authenticated', async (data) => {
        const messages = await chatService.getMessagesChat()
        socket.emit('messageLogs', messages); 
        socket.broadcast.emit('newUserConnected', data);
    });

    socket.on('message', async (data) => {
        const user = data.user;
        const messages = data.message;        
        const newMessage = await chatService.addMessagesChat(user, messages);
        const message = await chatService.getMessagesChat()        
        io.emit('messageLogs', messages); 
    });
};

export { updateProducts, chatSocket };