const formRestartPass = document.getElementById('formRestartPass');

formRestartPass.addEventListener('submit', (event) =>{
    event.preventDefault();
    const dataUser = new FormData(formRestartPass);
    const user = {};    
    dataUser.forEach((value,key)=>user[key]=value);    
    fetch('/api/sessions/restartPassword', {
        method:'PUT',
        body:JSON.stringify(user),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            window.location.replace('/login');
        }
    })
})