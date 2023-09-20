import { generateTokenForEmail } from "../utils.js";
import env from '../config.js'
import nodemailer from 'nodemailer'

const mailConfig = {
    service: 'gmail',
    port: 587,
    auth: {
        user: 'angelborre@gmail.com',
        pass: 'aewgfntvjucwmnxb',
    },
}
const transport = nodemailer.createTransport(mailConfig);

class MailingService{
    async createEmail(email){
        try {
            console.log('mailService', email)
            const token = generateTokenForEmail(email)
            console.log('token', token)
            const result = await transport.sendMail({
                from: `EcommerceBackend <'angelborre@gmail.com'>`,
                to: email,
                subject: 'Recuperar pass',
                html: `<h1>Para recuperar tu pass, haz click en el boton de abajo</h1>
                <hr>
                <a href="http://localhost:8080/api/session/resetPassword/${token}">CLICK AQUI</a>
                `,                
            })
            console.log(result)
            if(result){
                return result
            }else{
                console.log('todavia estas aca!')
            }
        } catch (e) {
            console.log(e)
            res.json({ error: e });
        }
    }    
}

export default MailingService