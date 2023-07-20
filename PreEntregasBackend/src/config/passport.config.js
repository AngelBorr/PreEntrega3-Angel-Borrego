import passport from 'passport';
import local from 'passport-local';
import UserManager from '../dao/userManagerMongo.js';
import { createHash, isValidPassword } from "../utils.js";

const userManager = new UserManager

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback:true,
        usernameField:'email'
        }, async(req, username, password, done) => {
            const { firstName, lastName, email, age } = req.body;
            try {
                const existingUser = await userManager.getUser(username) 
                if(existingUser !== typeof(Object)){
                    const user = { 
                        firstName,
                        lastName,
                        email,
                        age,
                        password: createHash(password)
                    };            
                    const newUser = await userManager.addUser(user);
                    if(newUser){
                        return done(null, newUser)
                    }else {
                        return done({message: 'Se produjo un error al crear el nuevo usuario: '+ error.message})
                    }
                }else{
                    return done(null, false)
                }
            } catch (error) {
                return done({message: 'Se produjo un error al obtener los datos para crear un nuevo usuario: '+ error.message})
            }
        }
    ));

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, 
        async (username, password, done) =>{
            try {
                //no incorpora el roll
                const user = await userManager.getUser( username );                
                if (!user){
                    return done(null, false, {message:"Usuario incorrectos y/o inexistente"})
                };
                
                if(!isValidPassword(user, password)){
                    return done(null, false, {message: "Contraseña incorrecta, verifique los datos ingresados"})
                };
                return done(null, user)
            } catch (error) {
                return done({message:'Error al Logearse'})
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await userManager.getUser({ _id });
            return done(null, user);
        } catch {
            return done({ message: "Se produjo un error al deserializa el usuario" });
        }
    });

}

export default initializePassport