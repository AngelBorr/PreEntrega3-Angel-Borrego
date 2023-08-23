import UsersManager from "./managers/mongo/users.mongo.js";
import ProductsManager from "./managers/mongo/products.mongo.js";
import CartsManager from "./managers/mongo/carts.mongo.js";
import MessageManager from "./managers/mongo/messages.mongo.js";
import UserGitHubManager from "./managers/mongo/usersGitHub.mongo.js";

import UsersManagerFile from "./managers/file/users.file.js";
import ProductsManagerFile from "./managers/file/products.file.js";
import CartsManagerFile from "./managers/file/carts.file.js";
import MessageManagerFile from "./managers/file/messages.file.js";
import UserGitHubManagerFile from "./managers/file/userGitHub.file.js";

class DaosFactory{
    constructor(){}

    usersDao(){
        const dao = process.env.PERSISTENCE || 'mongo';
        switch (dao) {
            case 'mongo':
                return new UsersManager
            case 'file':
                return new UsersManagerFile
            default:
                return new UsersManager
        }
    }

    usersGitHubDao(){
        const dao = process.env.PERSISTENCE || 'mongo';
        switch (dao) {
            case 'mongo':
                return new UserGitHubManager
            case 'file':
                return new UserGitHubManagerFile
            default:
                return new UserGitHubManager
        }
    }

    productsDao() {
        const dao = process.env.PERSISTENCE || 'mongo';
        switch (dao) {
            case 'mongo':
                return new ProductsManager
            case 'file':
                return new ProductsManagerFile
            default:
                return new ProductsManager
        }
    }

    cartsDao() {
        const dao = process.env.PERSISTENCE || 'mongo'
        switch (dao) {
            case 'mongo':
                return new CartsManager
            case 'file':
                return new CartsManagerFile
            default:
                return new CartsManager
        }
    }

    MessagesDao (){
        const dao = process.env.PERSISTENCE || 'mongo'
        switch (dao) {
            case 'mongo':
                return new MessageManager
            case 'file':
                return new MessageManagerFile
            default:
                return new MessageManager
        }
    }
}

export default DaosFactory