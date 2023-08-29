import { Router } from "express";
import passport from "passport";
import { failLogin, failRegister, gitHubCallBack, loginGitHub, loginUser, logoutSession, registerUser, resetPassword, usersCurrent } from "../controllers/controller.users.js";
import cookieParser from "cookie-parser";

const router = Router();
router.use(cookieParser());

//ruta post para el registerUser
router.post('/register', passport.authenticate('register', {failureRedirect:'/api/sessions/failRegister'}), registerUser)

router.get('/failRegister', failRegister)

//ruta login
router.post('/login', passport.authenticate('login', {failureRedirect:'/api/sessions/failLogin'}) , loginUser)

router.get('/failLogin', failLogin)

//ruta logout elimina la session
router.post('/logout', logoutSession)

//ruta resetPassword
router.put('/resetPassword', resetPassword)

//rutas Github
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), loginGitHub);

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), gitHubCallBack);

//ruta current
router.get('/current', passport.authenticate ('current', { session: false }), usersCurrent)

export default router