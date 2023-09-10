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
    }).then(result => result.json()).then(json => {
        try {
            const result = json.payload
            localStorage.setItem('token', result)
            const token = localStorage.getItem('token')
            console.log('token', token)
            if(token){
                window.location.replace('/products') 
            }         
        } catch (error) {
            console.log(error.message)
        }        
    })
})