import DaosFactory from "../dao/factory.js";

const userManager = new DaosFactory
const users = userManager.usersDao()

class UsersRepository{    
    constructor(){}

    //retorna el usuario
    async getUsers(email){        
        const user = await users.getUser(email);        
        return user
    }

    async getUserById(id){
        const user = await users.getUserId(id);                       
        return user
    }

    //crea usuario
    async createUser(bodyUser){        
        const user = await users.createUser(bodyUser);        
        return user
    }

    //modificar user password
    async updateUser(id, newpassword){
        const user = await users.getUserId(id);        
        const updatePass = await users.updateUser(user._id, newpassword)
        return updatePass
    }
}

export default UsersRepository