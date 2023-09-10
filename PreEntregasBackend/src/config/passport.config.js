import passport from 'passport';
import local from 'passport-local';
import { PRIVATE_KEY, cookieExtractor, createHash, generateToken, isValidPassword } from "../utils.js";
import UsersService from '../services/service.users.js';
import GitHubStrategy from 'passport-github2';
import env from '../config.js'
import UsersGitHubService from '../services/service.userGitHub.js';
import jwt from 'passport-jwt'
import CartService from '../services/service.carts.js';
import UserDTO from '../dto/user.dto.js';

const cartService = new CartService
const usersService = new UsersService
const LocalStrategy = local.Strategy
const userServiceGitHub = new UsersGitHubService
const clienteGitHub = env.gitHubId
const clienteGitHubSecret = env.gitHubSecret
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;


const initializePassport = () => {
    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            done(error);
        }
    }))

    passport.use('register', new LocalStrategy({
        passReqToCallback:true,
        usernameField:'email'
        }, async(req, username, password, done) => {
            const { firstName, lastName, email, age, birth_date, role } = req.body;
            try {
                const existingUser = await usersService.getUsers(username) 
                if(existingUser !== typeof(Object)){
                    const user = { 
                        firstName,
                        lastName,
                        email,
                        age,
                        password: createHash(password), 
                        birth_date,
                        role,
                        cart: await cartService.addCarts()
                    };
                    const newUser = await usersService.createUser(user);
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
                const user = await usersService.getUsers( username )
                if (!user){
                    return done(null, false, {message:"Usuario incorrectos y/o inexistente"})
                };
                
                if(!isValidPassword(user, password)){
                    return done(null, false, {message: "Contraseña incorrecta, verifique los datos ingresados"})
                };
                const userNoPass = new UserDTO(user)
                const token = generateToken(userNoPass);                
                return done(null, user, token)//porque token no es enviado al font?
            } catch (error) {
                return done({message:'Error al Logearse'}) 
            }
        }) 
    );
    
    passport.use('github', new GitHubStrategy({
        clientID: `${clienteGitHub}`,
        clientSecret: `${clienteGitHubSecret}`,
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
        }, async(accessToken, refreshToken, profile, done) => {
            try {
                const profileEmail = profile._json.email
                const profileName = profile._json.name               
                let user = await userServiceGitHub.getUserGitHub(profileEmail);
                if(!user){
                    const newUser = { 
                        firstName: profile._json.name,
                        lastName: '',
                        email: profile._json.email,
                        age: 0,
                        password: '',
                    };
                    user = await userServiceGitHub.addUserGitHub(newUser);
                    done(null, user)                    
                }else{
                    done(null, user)
                }                
            } catch (error) {
                return done({message: 'Se produjo un error al obtener los datos para crear un nuevo usuario: '+ error.message})
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await usersService.getUserById(_id);            
            return done(null, user);
        } catch {
            return done({ message: "Se produjo un error al deserializa el usuario" });
        }
    });

}

export default initializePassport