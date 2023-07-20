import userGithubModel from "./models/userGithub.models.js";

class UserGithubManager{
    userGithubModel;
    constructor(){
        this.userGithubModel = userGithubModel
    }

    async getUserGithub(email){
        try {
            console.log('2', email)
            const user = await this.userGithubModel.findOne({email});
            return user;
        } catch (error) {
            throw new Error('Se produjo un error al leer el E-mail ingresado')
        }
    }

    //crea al usuario
    async addUserGithub(bodyUser){
        try {
            const newUser = await this.userGithubModel.create(bodyUser);
            return newUser            
        } catch (error) {
            console.log('se produjo un error al crear un usuario nuevo', error.message)
        }
    }

    //get con id
    async getUserGithubById(id){
        try {
            const user = await this.userGithubModel.findOne({_id:id})
            if(!user){
                return `No se ha encontrado Productos con este id:(${id}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`;
            }
            return user;
        } catch (error) {
            throw new Error('Se produjo un error al leer los datos desde el Json')
            
        }
    }
}

export default UserGithubManager