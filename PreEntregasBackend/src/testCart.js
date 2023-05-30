import Carts from "./carts.js";

const carts = new Carts;

//agregando produtc al carrito
try {
    const productId = 3
    await carts.addProductsCarts(productId);
} catch (error) {
    console.log(error);
    //throw new Error('Se produjo al cargar el producto', error);
}

//agregando 2 products

try {
    const productId = 4
    await carts.addProductsCarts(productId);
} catch (error) {
    console.log(error);
    //throw new Error('Se produjo al cargar el producto', error);
}

try {
    const productId = 1
    await carts.addProductsCarts(productId);
} catch (error) {
    console.log(error);
    //throw new Error('Se produjo al cargar el producto', error);
}

//agregando products para sumar quantity

try {
    const productId = 1
    await carts.addProductsCarts(productId);
} catch (error) {
    console.log(error);
    //throw new Error('Se produjo al cargar el producto', error);
}

// utilizando deleteProductCarts

try {
    const deletedProductCarts = await carts.deleteProductsCarts(2);
    console.log(`Producto eliminado: ${deletedProductCarts}`);
} catch (error) {
    throw new Error('No se pudo eliminar el producto solicitado')
}

/// agregando product para sumar quantity
try {
    const productId1 = 1;
    const productId2 = 3;
    const productId3 = 4;
    await carts.addProductsCarts(productId1);
    await carts.addProductsCarts(productId2);
    await carts.addProductsCarts(productId3);
} catch (error) {
    console.log(error);
    //throw new Error('Se produjo al cargar el producto', error);
}

try {
    const productId1 = 1;    
    await carts.addProductsCarts(productId1);    
} catch (error) {
    console.log(error);
    //throw new Error('Se produjo al cargar el producto', error);
}

// utilizando getProductsCartsById

try {
    const product = carts.getProductsByIdCarts(1);
    console.log (`El producto solicitado es el siguiente: ${product}`)
} catch (error) {
    throw new Error('El producto solicitado no existe')
};

try {
    const product = carts.getProductsByIdCarts(4);       
    console.log(`El producto solicitado es el siguiente: ${product}`)
} catch (error) {
    throw new Error('El producto solicitado no existe')
};