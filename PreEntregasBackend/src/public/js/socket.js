import ProductManager from "../../dao/productsManager.js";
import MessageManager from "../../dao/messageManagerMongo.js";

const messageManager = new MessageManager;
const manager = new ProductManager;

const updateProducts = async (io) => {
    const products = await manager.getProducts();
    io.emit('updateProducts', products);
    
}

const chatSocket = async (socket, io) => {
    socket.on('authenticated', async (data) => {
        const messages = await messageManager.getMessages();
        socket.emit('messageLogs', messages); 
        socket.broadcast.emit('newUserConnected', data);
    });

    socket.on('message', async (data) => {
        const user = data.user;
        const messages = data.message;        
        const newMessage = await messageManager.addMessage(user, messages);
        const message = await messageManager.getMessages();
        io.emit('messageLogs', messages); 
    });
};

export { updateProducts, chatSocket };