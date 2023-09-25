import { generateTokenForEmail, transport } from "../utils.js";
import env from '../config.js'

class MailingService{
    async createEmail(email){
        try {
            const token = generateTokenForEmail(email)            
            const result = await transport.sendMail({
                from: `EcommerceBackend <${env.mailingUser}>`,
                to: email,
                subject: 'Recuperar pass',
                html: `<h1>Para recuperar tu pass, haz click en el boton de abajo</h1>
                <hr>
                <a href="${env.baseUrl}${env.port}/resetPassword/${token}">CLICK AQUI</a>
                `,                
            })
            if(result){
                return result
            }else{
                throw new Error(`Error al intentar mandar el email de recuperacion de pass al usuario: ${email}`);
            }
        } catch (error) {
            throw new Error(`No se puede mandar el email de recuperacion de pass al usuario: ${email}, erro: ${error}`);
        }
    }    
}

export default MailingService