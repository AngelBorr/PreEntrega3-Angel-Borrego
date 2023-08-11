import { Router } from 'express'
import { addMessageChat, getMessageChat } from '../controllers/controller.chat.js';

const router = Router ();

router.get('/', getMessageChat);

router.post('/', addMessageChat);

export default router