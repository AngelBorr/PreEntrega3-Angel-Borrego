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

    async createEmailOfDeleteProduct(user, product){
        try {           
            const result = await transport.sendMail({
                from: `EcommerceBackend <${env.mailingUser}>`,
                to: user.email,
                subject: 'Delete Product owner User Premium',
                html: `<h1>Producto eliminado</h1>
                <br>
                <p>El Administrador ha eliminado el siguiente producto:</p>
                <br>
                <hr>
                <table class='table table-striped'>
                    <thead>
                        <tr>
                            <th>IdProd</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Code</th>                            
                            <th>Category</th>
                            <th>owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${product._id}</td>
                            <td>${product.title}</td>
                            <td class="tdDescription">${product.description}</td>
                            <td>$ ${product.price}</td>
                            <td>${product.code}</td>                            
                            <td>${product.category}</td>
                            <td>${user.firstName}, ${user.lastName}</td>
                        </tr>
                    </tbody>
                </table>
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
    
    async createEmailDeleteUserToInactivity(user){
        try {           
            const result = await transport.sendMail({
                from: `EcommerceBackend <${env.mailingUser}>`,
                to: user.email,
                subject: 'Eliminacion de usuario',
                html: `<h1>Tu cuenta ha sido eliminada por inactidad</h1>
                <br>
                <p>Para volver a crear tu cuenta dirigite al siguiente enlace</p>
                <br>
                <hr>
                <a href="${env.baseUrl}${env.port}/register">CLICK AQUI</a>
                `,                
            })
            if(result){
                return result
            }else{
                throw new Error(`Error al intentar mandar el email de recuperacion de pass al usuario: ${user.email}`);
            }
        } catch (error) {
            throw new Error(`No se puede mandar el email de recuperacion de pass al usuario: ${user.email}, erro: ${error}`);
        }
    }
}

export default MailingService