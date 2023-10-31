const redirectToAdminPage = async (event) => {
    const token = localStorage.getItem('token')
    fetch('/adminProducts', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(result => {
        if(result.status === 200){
            window.location.replace('/adminProducts')
        } 
    })
}

const btnVolver = document.querySelector('.btnVolver')
btnVolver.addEventListener('click', redirectToAdminPage)