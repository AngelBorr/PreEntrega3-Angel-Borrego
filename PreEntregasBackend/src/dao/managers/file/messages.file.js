import fs from 'fs'

class MessageManagerFile{
    constructor(){
        this.messages = []
        this.pahtMessages = './assets/messages.json'
    }

    //traigo los mensajes
    async getMessages(){
        const data = await fs.promises.readFile(this.pahtMessages, 'utf8')
        const dataJson = JSON.parse(data)
        return dataJson
    }

    //guardo los mensajes en el archivo json
    async addMessages(user, message){
        const data = await fs.promises.readFile(this.pahtMessages, 'utf8');        
        if(!data){
            await fs.promises.writeFile(this.pahtMessages, '[]');
            return []
        }
        const existingUser = data.find(user => user.user === user)
        if(existingUser){
            existingUser.messages.push({message})
            await fs.promises.writeFile(this.pahtMessages, JSON.stringify(existingUser), 'utf8')
            return existingUser
        }else{
            const newProduct = {
                user: user,
                messages: [{message}]            
            }
            this.messages.push(newProduct)
            await fs.promises.writeFile(this.pahtMessages, JSON.stringify(this.messages), 'utf8')
            return this.messages
        }
        
    }

}

export default MessageManagerFile