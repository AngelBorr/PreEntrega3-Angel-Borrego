import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    userMongo: process.env.USER_MONGO,
    passMongo: process.env.PASS_MONGO,
    dbColecction: process.env.DB_NAME,
    keyPrivate: process.env.PRIVATE_KEY,
    secret: process.env.DATASESSION,
    gitHubId: process.env.CLIENTE_GITHUB,
    gitHubSecret: process.env.CLIENTE_GITHUB_SECRET,
    dbCluster: process.env.DB_CLUSTER,
    persistence: process.env.PERSISTENCE,
    entorno: process.env.NODE_ENV,
    paginate: {
        limit: process.env.LIMIT,
        page: process.env.PAGE
    },
    mailingService: process.env.MAIL_SERVICE,
    mailingPort: process.env.MAIL_PORT,
    mailingUser: process.env.USER_MAIL,
    mailingPass: process.env.MAIL_PASS,
    baseUrl: process.env.BASE_URL,
    tokenMp: process.env.MP_ACCESS_TOKEN
    

}