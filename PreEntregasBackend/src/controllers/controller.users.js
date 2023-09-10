import UsersService from "../services/service.users.js";
import UserDTO from "../dto/user.dto.js";

const usersService = new UsersService

export const registerUser = async (req, res) => {
    return res.status(200).send({status: 'success', message:'Usuario registrado'})    
}

export const failRegister = async (req, res) => {
    console.log('Fallo en la Estrategia');
    res.status(404).send({error:'Fallo'})
}

export const loginUser = async (req, res) => {
    if(!req.user){
        return res.status(400).send({status:'Error', error:'Credenciales Invalidas'})
    }
    req.session.user = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role            
    }
    return res.cookie('cookieToken', req.authInfo,{ httpOnly: true }).send({status:'usuario autenticado', message: 'cookie set', payload: req.authInfo})
}

export const failLogin = async (req, res) => {    
    res.send({error:'Fallo al Logearse'})
}

export const logoutSession = async (req, res) => {
    try {
        req.session.destroy(error =>{
            if(!error) res.status(200).send('Session eliminada');
            else res.status(400).send({status: 'Error al eliminar la session', body: error})
        })
    } catch (error) {
        return res.status(500).json('Se produjo un error al que obtener los datos para eliminar la session', error.message)
    }
    
}

export const resetPassword = async (req, res) => {
    try {
        const {email, newpassword} = req.body;        
        if(!email || !newpassword){
            return res.status(400).send('Email y/o Contraseña no ingresados, son requeridos')
        }
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
    res.redirect('/products');
}

//current
export const usersCurrent = async (req, res, next) => {    
    const user = new UserDTO(req.user)    
    res.send(user);    
}