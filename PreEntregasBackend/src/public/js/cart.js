// utilizar metodo put para actualizar quantity con input

//utilizar metodo put con deleteProductInCart con el button eliminar
const deleteProduct = async (event) => {
    const productId = event.target.dataset.id;

    const idCart = '64a5fda9331d448f7738fb34';
    
    if (!idCart) {
        console.error('ID del carrito no especificado');
        return;
    }

    const routerCart = await fetch(`/api/carts/${idCart}/product/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }        
    })

    const confirm = await routerCart.json();
    
    if(confirm){
        return console.log(confirm)
    }

}

const btnDeleteProduct = document.querySelectorAll('.btnDeleteProductCart');
btnDeleteProduct.forEach(btn => {
    btn.addEventListener('click', deleteProduct);
});