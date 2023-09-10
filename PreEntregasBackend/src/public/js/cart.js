const deleteProduct = async (event) => {
    const productId = event.target.dataset.id;
    const token = localStorage.getItem('token')
    const getUser = await fetch('/api/sessions/current', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const user = await getUser.json()
    const idCart = user.cart;    
    if (!idCart) {
        console.error('ID del carrito no especificado');
        return;
    }

    const routerCart = await fetch(`/api/carts/${idCart}/product/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }        
    })

    const confirm = await routerCart.json();
    //DEBERIA VOLVER A RENDERIZAR LA PAGINA Y ACTUALIZAR EL ESTADO DE LOS PRODUCTS
    
    if(confirm){
        return console.log(confirm)
    }
}

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

const comfirmBuy = async (event) => {
    const token = localStorage.getItem('token')
    const getUser = await fetch('/api/sessions/current', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const user = await getUser.json()
    if (!user) {
        console.error('Usuario no encontrado');
        return;
    }
    const idCart = user.cart; 

    const routerCart = await fetch(`/api/carts/${idCart}/purchase`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }        
    })

    const confirm = await routerCart.json();
    //DEBERIA VOLVER A RENDERIZAR LA PAGINA Y ACTUALIZAR EL ESTADO DE LOS PRODUCTS
    
    if(confirm){
        return console.log('Gracias por su compra')
    }
}

const btnDeleteProduct = document.querySelectorAll('.btnDeleteProductCart');
btnDeleteProduct.forEach(btn => {
    btn.addEventListener('click', deleteProduct);
});

const btnSeguirComprando = document.querySelector('.btnContinueBuing')
btnSeguirComprando.addEventListener('click', redirectToProductsPage)

const btncomprar = document.querySelector('.btnComprar')
btncomprar.addEventListener('click', comfirmBuy)