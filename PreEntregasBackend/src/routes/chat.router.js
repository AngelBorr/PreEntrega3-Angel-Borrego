import MyOwnRouter from './router.js';
import { addMessageChat, getMessageChat } from '../controllers/controller.chat.js';

export default class ChatRouter extends MyOwnRouter{
    init(){
        this.get('/', ['PUBLIC'], getMessageChat);
        this.post('/', ['USER', 'PREMIUM'], addMessageChat)
    }
}
