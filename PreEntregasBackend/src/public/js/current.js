fetch('/api/sessions/current',{
    method:'GET',
    headers:{
        'Autorization':`Bearer ${localStorage.getItem('token')}`
    }
    
}).then(response=>{
    if(response.status===401){
        window.location.replace('/login')
    }else{
        return response.json();
    }
}).then(json=> {
    const paragraph = document.getElementById('result');    
    paragraph.innerHTML =  `Hola, tus datos son ${json.email}, ${json.first_name} y ${json.last_name}`
})