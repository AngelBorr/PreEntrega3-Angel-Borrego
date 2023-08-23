import fs from 'fs'

class UsersManagerFile{
    constructor(){
        this.users = []
        this.pathUsers = './assets/users.json'
    }

    async getUser(email){
        const data = await fs.promises.readFile(this.pathUsers, 'utf8');
        const dataJson = JSON.parse(data)
        const user = dataJson.find(user => user.email === email)
        return user
    }

    async getUserId(id){
        const data = await fs.promises.readFile(this.pathUsers, 'utf8');
        const dataJson = JSON.parse(data)
        const user = dataJson.find(user => user.id === id)
        return user
    }

    async generateIdUsers(){
        let id = this.pathUsers.length > 0 ? this.pathUsers[this.pathUsers.length - 1].id + 1 : 1;
        return id;
    }

    async createUser(bodyUser){
        const data = await fs.promises.readFile(this.pathUsers, 'utf8');        
        if(!data){
            await fs.promises.writeFile(this.pathUsers, '[]');
            return []
        } 
        const newUser = {
            id: this.generateIdUsers(),
            ...bodyUser
        }
        this.users.push(newUser)
        await fs.promises.writeFile(this.pathUsers, JSON.stringify(this.users), 'utf8')
        return this.users

    }

    async updateUser(id, bodyUpdate){
        const data = await fs.promises.readFile(this.pathUsers, 'utf8');
        const dataJson = JSON.parse(data)
        const user = dataJson.find(user => user.id === id)
        if(user){
            Object.assign(user, bodyUpdate)
            const updatedUsers = JSON.stringify(users, null, 2);
            await fs.promises.writeFile(this.pathUsers, updatedUsers, 'utf8')
            return user
        }else{
            return user
        }
    }

}

export default UsersManagerFile