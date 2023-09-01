const btnAdmin = document.getElementById('btnadmin');

const formLogin = document.getElementById('loginUser');

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();
    const dataUser = new FormData(formLogin);
    const user = {};
    dataUser.forEach((value, key) => user[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(user),        
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            result.json().then(json => {
                localStorage.setItem('token', json.payload)                
            })
        }
        window.location.replace('/products')
    })
    fetch('/products',{
        method:'GET',
        headers:{
            'Autorization':`Bearer ${localStorage.getItem('token')}`
        }
    }).then(response=>{
        console.log('resProducts', response)
        if(response.status===401){
            window.location.replace('/login')
        }else{
            window.location.replace('/products')
        }
    })
})