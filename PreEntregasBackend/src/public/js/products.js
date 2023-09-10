const addProductInCart = async (event) => {
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }        
    })

    const confirm = await routerCart.json();
    
    if(confirm){
        return console.log(confirm)
    }    
};

const redirecToCartPage = async (event) => {
    const token = localStorage.getItem('token')
    console.log('token', token)
    const getUser = await fetch('/api/sessions/current', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const user = await getUser.json()
    const idCart = user.cart;
    const routerCart = await fetch(`/carts/${idCart}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(result => {
        if(result.status === 200){
            window.location.replace(`/carts/${idCart}`)
        } 
    })
}

const btnAddProducts = document.querySelectorAll('.btnAddProduct');
btnAddProducts.forEach(btn => {
    btn.addEventListener('click', addProductInCart);
});

const btnCarrito = document.querySelector('.btnCart')
btnCarrito.addEventListener('click', redirecToCartPage)