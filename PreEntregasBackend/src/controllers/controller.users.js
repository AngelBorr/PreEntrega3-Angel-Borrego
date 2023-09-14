import UsersService from "../services/service.users.js";
import UserDTO from "../dto/user.dto.js";
import { generateUserErrorInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";
import CustomError from "../services/errors/customError.js";

const usersService = new UsersService

export const registerUser = async (req, res) => {
    req.logger.info('El usuario se creo correctamente')
    return res.status(200).send({status: 'success', message:'Usuario registrado'})    
}

export const failRegister = async (req, res) => {
    req.logger.error('Fallo en la Estrategia');
    res.status(404).send({error:'Fallo'})
}

export const loginUser = async (req, res) => {
    if(!req.user){
        const {firstName, lastName, email, age, password, birth_date, role} = req.user
        if(!firstName || !lastName || !email || !age || !password || !birth_date || !role){
            req.logger.error('Se producjo un error al verificar el usuario, credenciales invalidas')
            CustomError.createError({
                name: 'User Creation Error',
                cause: generateUserErrorInfo({firstName, lastName, email, age, password, birth_date, role}),
                code: EErrors.INVALID_TYPES_ERROR,
                message: 'Error in the credentials User'
            });
        }
        req.logger.fatal('Las credenciales ingresados son invalidas')
        return res.status(400).send({status:'Error', error:'Credenciales Invalidas'})
    }
    req.session.user = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role            
    }
    req.logger.info('Session Iniciada, usuario: ' + req.user)
    return res.cookie('cookieToken', req.authInfo,{ httpOnly: true }).send({status:'usuario autenticado', message: 'cookie set', payload: req.authInfo})
}

export const failLogin = async (req, res) => {
    req.logger.error('Fallo al Logearse, credenciales invalidas')
    res.send({error:'Fallo al Logearse'})
}

export const logoutSession = async (req, res) => {
    try {
        req.session.destroy(error =>{
            if(!error){
                req.logger.info('Session Finalizada' + req.user)
                res.status(200).send('Session eliminada');
            }else{
                req.logger.error('Se produjo un error al eliminar la session')
                res.status(400).send({status: 'Error al eliminar la session', body: error})
            }
        })
    } catch (error) {
        req.logger.error('Se produjo un error al Obtener los datos para la finalizacion de la Session')
        return res.status(500).json('Se produjo un error al que obtener los datos para eliminar la session', error.message)
    }
    
}

//se cambia en la proxima entrega
export const resetPassword = async (req, res) => {
    try {
        const {email, newpassword} = req.body
        const user = await usersService.getUsers(email); 
        if (!user){
            return res.status(404).send("Usuario incorrectos y/o inexistente")
        };
        //modificar el manager
        const result = await usersService.updateUser(email, newpassword);
        if (result) res.status(200).send('contraseña restaurada exitosamente')
    } catch (error) {
        return res.status(500).send('Se produjo un error al que obtener los datos para restaurar la contraseña', error.message)
    }
    
}

//rutas gitHub
export const loginGitHub = async (req, res) => {};

export const gitHubCallBack = async (req, res) => {
    req.session.user = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        age: req.user.age                    
    }
    req.logger.info('Session Iniciada, usuario: ' + req.user)
    res.redirect('/products');
}

//current
export const usersCurrent = async (req, res, next) => {    
    const user = new UserDTO(req.user)    
    res.send(user);    
}