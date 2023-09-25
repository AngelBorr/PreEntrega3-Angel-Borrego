const formResetPass = document.getElementById('formResetPass');

formResetPass.addEventListener('submit', (event) =>{
    event.preventDefault();
    const dataUser = new FormData(formResetPass);
    const user = {};    
    dataUser.forEach((value,key)=>user[key]=value);
    const token = window.location.pathname.split('/').pop()
    user.token = token;    
    fetch('/api/sessions/resetPassword', {
        method:'PUT',
        body:JSON.stringify(user),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        console.log('result', result)
        if(result.status===200){
            window.location.replace('/login');
        }else if(result.status===400){
            window.location.replace('/restartPassword');
        }
    })
})