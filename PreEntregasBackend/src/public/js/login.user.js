const btnAdmin = document.getElementById('btnadmin');

const formLogin = document.getElementById('loginUser');

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();
    const dataUser = new FormData(formLogin);
    const user = {};
    dataUser.forEach((value, key) => user[key] = value);

    user.admin = btnAdmin.checked;    

    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(user),        
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{   
        console.log(result)
        if(result.status===200){
            window.location.replace('/products');
        }
    })
})