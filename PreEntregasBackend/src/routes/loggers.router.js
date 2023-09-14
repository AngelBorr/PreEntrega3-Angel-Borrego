import MyOwnRouter from "./router.js";
import { getLoggers } from "../controllers/controller.logger.js";

export default class LoggerRouter extends MyOwnRouter{
    init(){
        this.get('/', ['ADMIN'], getLoggers)
    }
}