//const token = localStorage.getItem('token');
fetch('/products',{
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        'autorization':`Bearer ${localStorage.getItem('token')}`
        //'autorization':`Bearer ${token}`//por que no envia el req.headers con la peticion?
    }
}).then(response=>{    
    if(response.status===401){
        console.log('resProducts2', response)
        window.location.replace('/login')
    }else{
        console.log("resProductsElse", response);
        return response.json();
    }
})

const addProductInCart = async (event) => {
    const productId = event.target.dataset.id;    
    const idCart = '64a5fda9331d448f7738fb34';    
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

const btnAddProducts = document.querySelectorAll('.btnAddProduct');
btnAddProducts.forEach(btn => {
    btn.addEventListener('click', addProductInCart);
});