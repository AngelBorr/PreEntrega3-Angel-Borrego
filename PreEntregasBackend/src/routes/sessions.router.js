import MyOwnRouter from './router.js';
import { Router } from "express";
import passport from "passport";
import { failLogin, failRegister, gitHubCallBack, loginGitHub, loginUser, logoutSession, registerUser, resetPassword, usersCurrent } from "../controllers/controller.users.js";
import cookieParser from "cookie-parser";

const router = Router();
router.use(cookieParser());

export default class SessionsRouter extends MyOwnRouter{
    init(){
        //ruta post para el registerUser
        this.post('/register', ['PUBLIC'], passport.authenticate('register', {failureRedirect:'/api/sessions/failRegister'}), registerUser)

        this.get('/failRegister', ['PUBLIC'], failRegister)

        //ruta login
        this.post('/login', ['PUBLIC'], passport.authenticate('login', {failureRedirect:'/api/sessions/failLogin'}) , loginUser)

        this.get('/failLogin', ['PUBLIC'], failLogin)

        //ruta logout elimina la session
        this.post('/logout', ['ADMIN', 'USER'], logoutSession)

        //ruta resetPassword
        this.put('/resetPassword', ['PUBLIC'], resetPassword)

        //rutas Github - VER LA POLITICA
        this.get('/github', ['PUBLIC'],passport.authenticate('github', { scope: ['user:email'] }), loginGitHub);

        this.get('/githubcallback', ['PUBLIC'],passport.authenticate('github', { failureRedirect: '/login' }), gitHubCallBack);

        //ruta current
        this.get('/current', ['ADMIN', 'USER'], usersCurrent)
    }
}