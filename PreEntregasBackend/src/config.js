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
    dbCluster: process.env.DB_CLUSTER
}