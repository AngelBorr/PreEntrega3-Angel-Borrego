const sessionLogout = async (event) =>{
    await fetch('/api/sessions/logout', {
        method: 'POST',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }                
    }).then(result=>{
        if(result.status===200){
            window.location.replace('/login');
        }
    })
};

const btnLogout = document.querySelectorAll('.btnLogout');
btnLogout.forEach(btn => {
    btn.addEventListener('click', sessionLogout)
});
