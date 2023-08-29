import mongoose, { Schema } from "mongoose";

const userCollection = 'user';

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
    age:{
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    birth_date:{
        type: Date,
        required: true,
    },
    cart:{
        type: Schema.Types.ObjectId, //referencias al modelo de Carrito (Carts), en este
        ref:'Carts',
        require:false        
    }, 
    role:{
        type: String,
        required: false //default user
    }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel