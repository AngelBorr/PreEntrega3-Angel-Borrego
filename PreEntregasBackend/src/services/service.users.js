import UsersManager from "../dao/managers/users.mongo.js";
import { createHash } from "../utils.js";

class UsersService{    
    constructor(){
        this.users = new UsersManager
    }

    //retorna el usuario
    async getUsers(email){
        try {
            const user = await this.users.getUser(email);                        
            return user;
        } catch (error) {
            throw new Error('Se produjo un error al leer el E-mail ingresado')
        }
    }

    async getUserById(id){
        try {
            const user = await this.users.getUserId(id);                        
            return user;
        } catch (error) {
            throw new Error('Se produjo un error al leer el id ingresado')
        }
    }

    //crea usuario
    async addUser(bodyUser){
        try {
            if(typeof(bodyUser) !== Object){
                throw new Error('Se produjo un error al cargar los datos del nuevo usuario, verifique si los campos estan correctamente completados')
            }
            const user = await this.users.createUser(bodyUser);
            return user            
        } catch (error) {
            throw new Error('se produjo un error al crear un usuario nuevo', error.message)
        }
    }

    //modificar user password
    async updateUser(email, newpassword){
        try {
            const user = await this.users.getUser(email)
            if(!user){
                throw new Error(`No se ha encontrado Usuario resgistrado con este E-mail:(${email}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`);
            }else{
                //actualizar contraseña en base de datos
                const updatePassword = createHash(newpassword);
                const updatePass = await this.users.updateUser(user._id, {password: updatePassword})            
                return updatePass
            }
            
        } catch (error) {
            throw new Error(`Error al actualizar la contraseña: ${error.message}`);
        }
    }
}

export default UsersService