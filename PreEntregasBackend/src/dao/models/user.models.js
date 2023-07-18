import mongoose from "mongoose";

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
        type: Number,
        required: true,        
        match: /^\S+@\S+\.\S+$/
    }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel