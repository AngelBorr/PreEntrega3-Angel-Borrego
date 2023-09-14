import MyOwnRouter from './router.js';
import { getViewCartById, getViewChat, getViewCurrent, getViewFormularyProducts, getViewHandlebarsProducts, getViewLoginUser, getViewMocking, getViewProducts, getViewRegisterUser, getViewResetPass, privateAccess, publicAccess } from '../controllers/controller.views.js';

export default class ViewRouter extends MyOwnRouter{
    init(){
        this.get('/products', ['ADMIN', 'USER'], privateAccess, getViewProducts);        
        this.get('/carts/:cid', ['ADMIN', 'USER'], privateAccess, getViewCartById);
        this.get('/addProducts', ['ADMIN'], privateAccess, getViewFormularyProducts);
        this.get('/realtimeproducts', ['ADMIN'], privateAccess, getViewHandlebarsProducts)
        this.get('/chat', ['PUBLIC'], getViewChat)
        this.get('/register', ['PUBLIC'], publicAccess, getViewRegisterUser)
        this.get('/login', ['PUBLIC'], publicAccess, getViewLoginUser)
        this.get('/resetPassword', ['PUBLIC'], publicAccess, getViewResetPass)
        this.get('/current', ['ADMIN', 'USER'],privateAccess, getViewCurrent )
        this.get('/mockingproducts', ['ADMIN', 'USER'],privateAccess, getViewMocking )
    }

}