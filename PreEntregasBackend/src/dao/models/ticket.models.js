import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketsCollection = 'ticket'

const ticketSchema = new mongoose.Schema({
    code: {
        type : Number,
        required: true
    },
    purchase_datetime:{
        type: Date ,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    purchaser:{
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/ 
    }

})

const ticketsModel = mongoose.model(ticketsCollection, ticketSchema)

export default ticketsModel