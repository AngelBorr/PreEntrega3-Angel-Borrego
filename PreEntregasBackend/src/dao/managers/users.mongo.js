import userModel from "../models/user.models.js";

class UsersManager{
    userModel;
    constructor(){
        this.userModel = userModel
    }

    //trae al usuario por su email
    async getUser(email){
        const user = await this.userModel.findOne({email})
        return user
    }

    //trae al usuario por su id
    async getUserId(id){
        const user = await this.userModel.findById({_id:id})
        return user
    }

    //crea al usuario
    async createUser(bodyUser){
        const user = await this.userModel.create(bodyUser)
        return user
    }

    //modificar user password
    async updateUser(id, bodyUpdate){
        const idMongoUser = {_id:id}
        const updatePass = await this.userModel.updateOne(idMongoUser, bodyUpdate)
        return updatePass
    }
}

export default UsersManager