import { Router } from 'express'
import MessageManager from '../dao/messageManagerMongo.js'

const router = Router ();

const message = new MessageManager;

router.get('/', async (req, res) => {
    try {
        const messages = await message.getMessages();
        res.status(200).send({result: 'success', messages: messages});
    } catch (error) {
        res.status(500).send({'No hay mensajes para mostrar': error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const { user, messages } = req.body;
        const newMessage = await message.addMessage(user, messages);
        res.status(200).send({result: 'success', message: newMessage});
    } catch (error) {
        res.status(500).send({'Se produjo un error al traer los mensajes de los usuario': error.message});
    }
});

export default router