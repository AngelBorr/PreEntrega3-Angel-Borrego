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

const deleteProduct = async (event) => {
    const productId = event.target.dataset.id 
    console.log(productId)
    const routerUsers = await fetch(`/api/products/${productId}  `, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(result => {
        if(result.status === 200){
            console.log('Producto eliminado correctamente')
            setTimeout(function(){
                location.reload();
            }, 1500)            
        }
    })
}

const redirectCreateProductsPage  = async (event) => {
    const token = localStorage.getItem('token')
    fetch('/addProducts', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(result => {
        if(result.status === 200){
            window.location.replace('/addProducts')
        } 
    })
}

const btnVolver = document.querySelector('.btnVolver')
btnVolver.addEventListener('click', redirectToProductsPage)

const btnDeleteroduct = document.querySelectorAll('.btnDeleteroduct')
btnDeleteroduct.forEach(btn => {
    btn.addEventListener('click', deleteProduct)
})

const btnCreateProductsPage = document.querySelector('.btnCreateProductsPage')
btnCreateProductsPage.addEventListener('click', redirectCreateProductsPage)