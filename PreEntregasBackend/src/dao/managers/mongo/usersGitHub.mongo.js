import userGithubModel from '../../models/userGithub.models.js'

class UserGitHubManager{
    constructor(){
        this.userGitHubModel = userGithubModel
    }

    getUserGitHub(email){
        const userGitHub = this.userGitHubModel.findOne({email})
        return userGitHub
    }

    createUserGitHub(bodyUser){
        const newUserGitHub = this.userGitHubModel.create(bodyUser)
        return newUserGitHub
    }

    getUserGitHubById(id){        
        const userGitHub = this.userGitHubModel.findOne({_id:id})        
        return userGitHub
    }

}

export default UserGitHubManager