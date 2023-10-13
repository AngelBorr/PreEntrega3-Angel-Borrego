import { addDocumentsToUser, updateRole } from '../controllers/controller.users.js';
import { uploader } from '../utils.js';
import MyOwnRouter from './router.js';

export default class UsersRouter extends MyOwnRouter{
    init(){
        // la ruta put debera actualizar el rol del usuario
        this.put('/premium/:id', ['ADMIN', 'USER', 'PREMIUM'], updateRole); 

        // la ruta post  recibe los documentos y los agrega al usuario  
        this.post('/:uid/documents', ['USER', 'PREMIUM'] , uploader.array('profiles'), addDocumentsToUser)
    }
}