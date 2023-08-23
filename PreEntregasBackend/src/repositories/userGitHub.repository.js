import DaosFactory from "../dao/factory.js";

const userGitHubManager = new DaosFactory
const users = userGitHubManager.usersGitHubDao()

class UsersGitHubRepository{    
    constructor(){}

    //retorna el usuario
    async getUserGitHub(email){        
        const user = await users.getUserGitHub(email);        
        return user
    }

    async getUserGitHubById(id){
        const user = await users.getUserGitHubById(id);                       
        return user
    }

    //crea usuario
    async createUserGitHub(bodyUser){
        const user = await users.createUserGitHub(bodyUser);
        return user
    }    
}

export default UsersGitHubRepository