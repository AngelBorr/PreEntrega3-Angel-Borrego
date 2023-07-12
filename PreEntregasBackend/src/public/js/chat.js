const socket = io()
let user
let chatbox = document.getElementById('chatbox')

Swal.fire({
    title: 'Ingresa tu mail, para comenzar a chatear',
    input: 'text',
    inputValidator: (value) => {
        return !value && 'Necesitas escribir un mail para utilizarlo como nombre de usuario para comenzar'
    },
    allowOutsideClick: false    
}).then(result =>{
    user = result.value;
    socket.emit('authenticated', user)
})

socket.on('newUserConnected', data => {
    if(!user){
        return
    }
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: 'success'        
    })
})

chatbox.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        if(chatbox.value.trim().length > 0){
            socket.emit('message', {user:user, message: chatbox.value});
            chatbox.value = '';
        }
    }
})

socket.on('messageLogs', (data) => {
    if(!user){
        return
    }
    console.log('1', data)
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message} <br/>` 
    });
    log.innerHTML = messages

})

