import fs from 'fs'

class UserGitHubManagerFile{
    constructor(){
        this.userGitHub = []
        this.pathUserGitHub = './assets/userGitHub.json'
    }

    //trae a todos los users
    async getUserGitHub(email){
        const data = await fs.promises.readFile(this.pathUserGitHub, 'utf8');
        const dataJson = JSON.parse(data)
        const user = dataJson.find(user => user.email === email)
        return user
    }

    async generateIdUsersGitHub(){
        let id = this.pathUserGitHub.length > 0 ? this.pathUserGitHub[this.pathUserGitHub.length - 1].id + 1 : 1;
        return id;
    }

    //create users
    async createUserGitHub(bodyUserGitHub){
        const data = await fs.promises.readFile(this.pathUserGitHub, 'utf8');        
        if(!data){
            await fs.promises.writeFile(this.pathUserGitHub, '[]');
            return []
        } 
        const newUserGitHub = {
            id: this.generateIdUsersGitHub(),
            ...bodyUserGitHub
        }
        this.userGitHub.push(newUserGitHub)
        await fs.promises.writeFile(this.pathUserGitHub, JSON.stringify(this.userGitHub), 'utf8')
        return this.userGitHub
    }

    //trae a users por su id
    async getUserGitHubById(id){        
        const data = await fs.promises.readFile(this.pathUserGitHub, 'utf8');
        const dataJson = JSON.parse(data)
        const user = dataJson.find(user => user.id === id)
        return user
    }

}

export default UserGitHubManagerFile