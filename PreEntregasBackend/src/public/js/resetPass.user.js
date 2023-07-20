const formResetPass = document.getElementById('formResetPass');

formResetPass.addEventListener('submit', (event) =>{
    event.preventDefault();
    const dataUser = new FormData(formResetPass);
    const user = {};    
    dataUser.forEach((value,key)=>user[key]=value);    
    fetch('/api/sessions/resetPassword', {
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