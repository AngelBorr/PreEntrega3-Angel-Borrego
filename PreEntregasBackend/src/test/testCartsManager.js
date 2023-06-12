import CartsManager from "../cartsManager.js";

const carts = new CartsManager;

//agregando carritos
try {
    await carts.addCarts();
    
} catch (error) {
    throw new Error('Se produjo un error al agregar un nuevo carrito', error);
}
try {
    await carts.addCarts();
    
} catch (error) {
    throw new Error('Se produjo un error al agregar un nuevo carrito', error);
}
try {
    await carts.addCarts();
    
} catch (error) {
    throw new Error('Se produjo un error al agregar un nuevo carrito', error);
}
try {
    await carts.addCarts();
    
} catch (error) {
    throw new Error('Se produjo un error al agregar un nuevo carrito', error);
}

// agregando productos al carrito 3
try {
    const idCart = 3;
    const idProduct = 1;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}

// sumando quantities de los produstos y mas productos añ carrito 3
try {
    const idCart = 3;
    const idProduct = 1;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}

try {
    const idCart = 3;
    const idProduct = 3;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}

try {
    const idCart = 3;
    const idProduct = 3;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}

try {
    const idCart = 3;
    const idProduct = 4;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}

//agregando productos a los demas carritos

//carrito 1

try {
    const idCart = 1;
    const idProduct = 1;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}

//carrito 2

try {
    const idCart = 2;
    const idProduct = 4;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}

try {
    const idCart = 2;
    const idProduct = 4;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}

//carrito 4

try {
    const idCart = 4;
    const idProduct = 1;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}

try {
    const idCart = 4;
    const idProduct = 1;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}

try {
    const idCart = 4;
    const idProduct = 3;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}

// utilizando getByIdCarts

try {
    const idCart = 4;
    await carts.getByIdCarts(idCart);
    
} catch (error) {
    throw new Error(`Se produjo un error al mostrar el carrito con el id: ${idCart}`, error);
}

try {
    const idCart = 1;
    await carts.getByIdCarts(idCart);
    
} catch (error) {
    throw new Error(`Se produjo un error al mostrar el carrito con el id: ${idCart}`, error);
}

//utilizando deleteCart

try {
    const idCart = 1;
    await carts.deleteCart(idCart);
    
} catch (error) {
    throw new Error(`Se produjo un error al eliminar el carrito con el id: ${idCart}`, error);
}

//utilizando deleteProductCart se resta quantity hasta que sea 1 y en 0 se elimina el prod

try {
    const idCart = 2;
    const idProduct = 4;
    await carts.deleteProductCart(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al eliminar el carrito con el id: ${idCart}`, error);
}

try {
    const idCart = 3;
    const idProduct = 3;
    await carts.deleteProductCart(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al eliminar el carrito con el id: ${idCart}`, error);
}

//utilizando deleteProduct con quantity en 1 el cual debe borrar el product

try {
    const idCart = 4;
    const idProduct = 3;
    await carts.deleteProductCart(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al eliminar el carrito con el id: ${idCart}`, error);
}

try {
    const idCart = 4;
    const idProduct = 4;
    await carts.addProductsCarts(idCart, idProduct);
    
} catch (error) {
    throw new Error(`Se produjo un error al cargar el producto con el id: ${idProduct} al carrito con el id: ${idCart}`, error);
}