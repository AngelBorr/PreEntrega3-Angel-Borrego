import UsersRepository from "../repositories/user.repository.js";
import { createHash } from "../utils.js";
import CustomError from "./errors/customError.js";
import EErrors from "./errors/enums.js";
import { generateUserErrorInfo } from "./errors/info.js";

class UsersService{    
    constructor(){
        this.users = new UsersRepository
    }

    //retorna el usuario
    async getUsers(email){
        try {
            if(!email){
                console.log('error')
                CustomError.createError({
                    name: 'user Creation Error',
                    cause: generateUserErrorInfo({email}),
                    code: EErrors.INVALID_TYPES_ERROR,
                    message: 'Error trying to create a new user'
                });
            }    
            const user = await this.users.getUsers(email);
            return user;
        } catch (error) {
            throw new Error('Se produjo un error al leer el E-mail ingresado')
        }
    }

    async getUserById(id){
        try {
            const user = await this.users.getUserById(id);                        
            return user;
        } catch (error) {
            throw new Error('Se produjo un error al leer el id ingresado')
        }
    }

    //crea usuario
    async createUser(bodyUser){
        try {
            if(typeof(bodyUser) != 'object'){
                throw new Error('Se produjo un error al cargar los datos del nuevo usuario, verifique si los campos estan correctamente completados')
            }            
            const {firstName, lastName, email, age, password, birth_date, role} = bodyUser
            if(!firstName || !lastName || !email || !age || !password || !birth_date || !role){
                console.log('error')
                CustomError.createError({
                    name: 'user Creation Error',
                    cause: generateUserErrorInfo({firstName, lastName, email, age, password, birth_date, role}),
                    code: EErrors.INVALID_TYPES_ERROR,
                    message: 'Error trying to create a new user'
                });
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
            
            if(!email || !newpassword){
                const password = newpassword
                console.log('error')
                CustomError.createError({
                    name: 'user Creation Error',
                    cause: generateUserErrorInfo({email, password}),
                    code: EErrors.INVALID_TYPES_ERROR,
                    message: 'Error trying to create a new user'
                });
            }  
            const user = await this.users.getUsers(email)
            if(!user){
                throw new Error(`No se ha encontrado Usuario resgistrado con este E-mail:(${email}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`);
            }else{
                //actualizar contraseña en base de datos
                const updatePassword = createHash(newpassword)
                const updatePass = await this.users.updateUser(user._id, {password: updatePassword})
                return updatePass
            }
            
        } catch (error) {
            throw new Error(`Error al actualizar la contraseña: ${error.message}`);
        }
    }
}

export default UsersService