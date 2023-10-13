const updateRoleUser = async (event) => {    
    const formUpdateRole = document.getElementById('formUpdateRole')
    formUpdateRole.addEventListener('submit', async (event) =>{
        event.preventDefault();
        const idUser = window.location.pathname.split('/').pop()
        console.log(idUser)        
        const dataUser = new FormData(formUpdateRole);
        const user = {};
        dataUser.forEach((value, key) => user[key] = value);
        console.log(user)
        const router = await fetch(`/api/users/premium/${idUser}`, {
            method: 'PUT',
            body:JSON.stringify(user),
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => {
            console.log(result)
            if(result.status === 200){
                window.location.replace(`/products`)
            }
        })
    })    
}

const btnEnviar = document.querySelector('.btnEnviar')
btnEnviar.addEventListener('click', updateRoleUser)