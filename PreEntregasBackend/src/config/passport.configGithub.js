import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import UserGithubManager from '../dao/userGithubManager.js';
import env from '../config.js'

const userGithubManager = new UserGithubManager
const clienteGitHub = env.gitHubId
const clienteGitHubSecret = env.gitHubSecret

const initializePassportForGithub = () => {
    passport.use('github', new GitHubStrategy({
        clientID: `${clienteGitHub}`,
        clientSecret: `${clienteGitHubSecret}`,
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
        }, async(accessToken, refreshToken, profile, done) => {
            try {
                const profileEmail = profile._json.email
                const profileName = profile._json.name

                console.log('1', profile)                
                let user = await userGithubManager.getUserGithub(profileEmail);                                
                if(!user){
                    const newUser = { 
                        firstName: profile._json.name,
                        lastName: '',
                        email: profile._json.email,
                        age: 0,
                        password: '',
                    };            
                    user = await userGithubManager.addUserGithub(newUser);
                    done(null, user)                    
                }else{
                    done(null, user)
                }                
            } catch (error) {
                return done({message: 'Se produjo un error al obtener los datos para crear un nuevo usuario: '+ error.message})
            }
        }
    ));    

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await userGithubManager.getUserGithubById({_id});
            return done(null, user);
        } catch {
            return done({ message: "Se produjo un error al deserializa el usuario" });
        }
    });

}

export default initializePassportForGithub