import UsersGitHubRepository from "../repositories/userGitHub.repository.js";

class UsersGitHubService{
    constructor(){
        this.usersGitHub = new UsersGitHubRepository
    }

    //trae a los usuarios gitHub por email
    async getUserGitHub(email){
        try {
            const userGitHub = await this.usersGitHub.getUserGitHub(email)
            return userGitHub
        } catch (error) {
            throw new Error('Se produjo un error al leer el E-mail ingresado')
        }
    }

    //agrega usuarios gitHub
    async addUserGitHub(bodyUser){
        try {            
            const newUserGitHub = await this.usersGitHub.createUserGitHub(bodyUser)
            return newUserGitHub
        } catch (error) {
            throw new Error('se produjo un error al crear un usuario nuevo', error.message)
        }
    }

    //trae a los usuarios gitHub por su id
    async getUserGitHubById(id){
        try {
            const userGitHub = await this.usersGitHub.getUserGitHubById(id)
            if(!userGitHub){
                throw new Error(`No se ha encontrado Usuario resgistrado con este Id: (${id}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`);
            }
            return userGitHub
        } catch (error) {
            throw new Error('Se produjo un error al leer el Id ingresado')
        }
    }

}

export default UsersGitHubService