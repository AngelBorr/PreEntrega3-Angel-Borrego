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
    /*if (confirm .status === 1 ) {
        console.log(`Producto agregado al carrito exitosamente!`);
    } else {
        console.log(' 8 - Error al agregar el producto al carrito');
    }
        .then(response => response.json())
        .then(cart => {
            console.log(`Producto agregado al carrito ${idCart}`);
        }); */
};

const btnAddProducts = document.querySelectorAll('.btnAddProduct');
btnAddProducts.forEach(btn => {
    btn.addEventListener('click', addProductInCart);
});