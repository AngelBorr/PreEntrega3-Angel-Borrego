import mongoose from 'mongoose'

const messageCollection = 'messages'

const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    
})

const messageModel = mongoose.model(messageCollection, messageSchema)

export default messageModel