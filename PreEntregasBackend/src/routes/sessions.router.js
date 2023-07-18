import UserManager from "../dao/userManagerMongo.js";
import { Router } from "express";

const router = Router();

const userManager = new UserManager;

//ruta post para el registerUser
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, age, password } = req.body;        
        const existingUser = await userManager.getUser(email)        
        if(existingUser !== typeof(Object)){
            const user = { firstName, lastName, email, age, password };
            const newUser = await userManager.addUser(user);
            if(newUser){
                return res.status(200).send({status: 'success'})
            }else {
                return res.status(404).send(`El usuario no pudo agregrarse con exito`);
            }
        }else{
            throw `Ya existe un usuario registrado con ese email: ${email}`
        }
    } catch (error) {
        return res.status(500).json(`Error al obtener el los datos del usuario desde el formulario de registro, verifique los datos`);
    }
})
//ruta login
router.post('/login', async (req, res) => {
    try {
        const bodyUser = req.body        
        const userEmail = bodyUser.email;
        const userPassword = Number(bodyUser.password);        
        const user = await userManager.getUser(userEmail);
        
        if (!user){
            return res.status(404).json("Usuario incorrectos y/o inexistente")
        };
        
        if(user.password !== userPassword){
            return res.status(404).json("Contraseña incorrecta, verifique los datos ingresados")
        };

        if(bodyUser.admin === true){
            user.admin = 'administrador'
        }else{
            user.admin = 'usuario'
        }
        
        req.session.user = {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            age: user.age,
            rol: user.admin            
        }
        
        return res.status(200).send({status:'usuario autenticado', user: req.session.user})
        
    } catch (error) {
        return res.status(500).json('error al autenticar el usuario')
    }
})
//ruta logout elimina la session
router.post('/logout', (req, res) => {
    try {
        req.session.destroy(error =>{
            if(!error) res.status(200).send('Session eliminada');
            else res.status(400).send({status: 'Error al eliminar la session', body: error})
        })
    } catch (error) {
        return res.status(500).json('Se produjo un error al que obtener los datos para eliminar la session', error.message)
    }
    
})

export default router