import winston from 'winston'
import env from '../../config.js'

const entorno = env.entorno

const customLevelsOptions = {
    levels:{
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        debug:'blue',
        http : 'green',
        info: 'cyan',
        warning: 'yellow',
        error: "red",
        fatal:"magenta"
    }
}

export const addLogger = (req, res, next) => {
    if(entorno === 'production'){
        const logger = winston.createLogger({
            levels: customLevelsOptions.levels,
            transports:[
                new winston.transports.Console({ 
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.colorize({ colors: customLevelsOptions.colors}),
                        winston.format.simple()
                    )
                }),
                new winston.transports.File({
                    filename: './errors.log',
                    level: 'error',
                    format: winston.format.simple()
                })
            ]
        })
        req.logger = logger
        req.logger.http(`Entorno: ${entorno} - ${req.method} en ${req.url} - ${new Date()}`)
        next()
    }else if(entorno === 'development'){
        const logger = winston.createLogger({
            levels: customLevelsOptions.levels,
            transports:[
                new winston.transports.Console({
                    level: 'debug',
                    format: winston.format.combine(
                        winston.format.colorize({ colors: customLevelsOptions.colors}),
                        winston.format.simple()
                    )
                }),
                new winston.transports.File({
                    filename: './errors.log',
                    level: 'error',
                    format: winston.format.simple()
                })
            ]
        })
        req.logger = logger
        req.logger.http(`Entorno: ${entorno} - ${req.method} en ${req.url} - ${new Date()}`)
        next()
    }else if(!entorno){
        const logger = winston.createLogger({
            levels: customLevelsOptions.levels,    
            transports:[
                new winston.transports.Console({
                    level: 'http',
                    format: winston.format.combine(
                        winston.format.colorize({ colors: customLevelsOptions.colors}),
                        winston.format.simple()
                    )
                })
            ]
        })
        req.logger = logger
        req.logger.http(`${req.method} en ${req.url} - ${new Date()}`)
        next()
    }
    
}