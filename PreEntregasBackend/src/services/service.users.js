import UsersRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils.js";
import CustomError from "./errors/customError.js";
import EErrors from "./errors/enums.js";
import { generateUpdateRoleErrorInfo, generateUserErrorInfo } from "./errors/info.js";

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
    async updateUser(email, newPassword){
        try {
            
            if(!email || !newPassword){
                const password = newPassword
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
                const comparation = isValidPassword(user, newPassword)
                console.log('comparation', comparation)
                if(comparation === true){
                    req.logger.error('No se puede utilizar la misma contraseña, verifique los datos')
                    throw new Error(`No se puede cambiar la pass ya que es la misma que se encuentra en la base de datos, verifique que los datos ingresados sean los correctos y vuelve a intentarlo`);
                }else{
                    const updatePassword = createHash(newPassword)
                    const updatePass = await this.users.updateUser(user._id, {password: updatePassword})
                    return updatePass
                }
            }            
        } catch (error) {
            throw new Error(`Error al actualizar la contraseña: ${error.message}`);
        }
    }

    //modificar el role de los user
    async updateRole(id, newRole){
        try {
            const idUser = id
            const roleUpdate = newRole
            if(!idUser || !roleUpdate){
                console.log('error')
                CustomError.createError({
                    name: 'user Creation Error',
                    cause: generateUpdateRoleErrorInfo({idUser, roleUpdate}),
                    code: EErrors.INVALID_TYPES_ERROR,
                    message: 'Error trying to update role for user'
                });
            } 
            const user = await this.users.getUserById(idUser)
            if(!user){
                req.logger.error(`No existe usuario con este id: ${idUser}`)
                throw new Error(`No se ha encontrado Usuario resgistrado con este id:(${idUser}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`);
            }
            const userUpdate = await this.users.updateUser(idUser, newRole)
            return userUpdate
        } catch (error) {
            throw new Error(`Error al actualizar role: ${error.message}`);
        }
    }

}

export default UsersService