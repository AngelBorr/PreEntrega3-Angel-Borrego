const redirectToProductsPage = async (event) => {
    const token = localStorage.getItem('token')
    fetch('/products', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(result => {
        if(result.status === 200){
            window.location.replace('/products')
        } 
    })
}

const redirectToChangeRolePage = async (event) => {
    const userId = event.target.dataset.id
    const routerUsers = await fetch(`/premium/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(result => {
        if(result.status === 200){
            window.location.replace(`/premium/${userId}`)
        } 
    })
}

const deleteUser = async (event) => {
    const userId = event.target.dataset.id
    const routerUsers = await fetch(`/api/users`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userId})
    }).then(result => {
        if(result.status === 200){
            console.log('Usuario eliminado correctamente')
            setTimeout(function(){
                location.reload();
            }, 1500)            
        } 
    })
}

const btnChangeRole = document.querySelectorAll('.btnChangeRole')
btnChangeRole.forEach(btn => {
    btn.addEventListener('click', redirectToChangeRolePage)
})

const btnVolver = document.querySelector('.btnVolver')
btnVolver.addEventListener('click', redirectToProductsPage)

const btnDeleteUser = document.querySelectorAll('.btnDeleteUser')
btnDeleteUser.forEach(btn => {
    btn.addEventListener('click', deleteUser)
})



