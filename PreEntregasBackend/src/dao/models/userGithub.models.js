import mongoose from "mongoose";

const userGithubCollection = 'userGithub';

const userGithubSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
    age:{
        type: Number,
        required: false,
    },
    password:{
        type: String,
        required: false
    }
});

const userGithubModel = mongoose.model(userGithubCollection, userGithubSchema);

export default userGithubModel