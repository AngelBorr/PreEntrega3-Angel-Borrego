import ProductManager from "./productsManager.js";

const manager = new ProductManager

//agregando productos al json
try {
    await manager.addProduct({ // hago uso de top-level await https://github.com/tc39/proposal-top-level-await
        title: "Remera",
        description: "Remera 100% algodon \n colores: Blanco, Negro, Azul y Amarillo \n Talles: XXL, XL, L, M y S",
        price: 1500,
        thumbnail: "Sin imagen",
        code: "R-123",
        stock: 20
    });
} catch (error) {
    throw new Error(error.message) // ya estas manejando el error en productsManager, por lo que el texto que estaba esconde el error original
}

try {
    await manager.addProduct({ // igual que arriba. Recuerda que addProduct es una funcion asincrona y necesitas que en este caso la operacion sea secuencial.
        title: "Pantalon",
        description: "Pantalo de Gabardina \n colores: Blanco, Negro, Azul y Amarillo \n Talles: XXL, XL, L, M y S",
        price: 2500,
        thumbnail: "Sin imagen",
        code: "R-124",
        stock: 30
    });
} catch (error) {
    throw new Error('Se produjo al cargar el producto')
}

try {
    await manager.addProduct({
        title: "Remera",
        description: "Remera 100% algodon \n colores: Blanco, Negro, Azul y Amarillo \n Talles: XXL, XL, L, M y S",
        price: 1500,
        thumbnail: "Sin imagen",
        code: "R-125",
        stock: 30
    });
} catch (error) {
    throw new Error('Se produjo un error al cargar el producto')
}

try {
    await manager.addProduct({
        title: "buso",
        description: "buso 100% algodon \n colores: Blanco, Negro, Azul y Amarillo \n Talles: XXL, XL, L, M y S",
        price: 2500,
        thumbnail: "Sin imagen",
        code: "R-126",
        stock: 30
    });
} catch (error) {
    throw new Error('Se produjo un error al cargar el producto')
}

// utilizando updateProduct en prod 2 y 4
try {
    const id = 2;
    let product = await manager.getProductById(id)
    console.log({ product })
    const updatedProduct = await manager.updateProduct(id, { price: 8500 });
    console.log('Producto actualizado: ', { updatedProduct }) // return detiene la ejecucion del script y no llega a lo que escribiste abajo, asi que solo lo dejo con logs.
} catch (error) {
    throw new Error('la actualizacion del producto no se pudo realizar')
}

try {
    await manager.getProducts();
    const updatedProduct = await manager.updateProduct(4, { stock: 10 });
    // return `Producto actualizado: ${updatedProduct}`;
    console.log('Producto actualizado: ', { updatedProduct })
} catch (error) {
    //throw new Error('la actualizacion del producto no se pudo realizar')
    console.log(error)
}

//utilizando getProductById
try {
    const product = await manager.getProductById(2);
    // return `El producto solicitado es el siguiente: ${product}`
    console.log('El producto solicitado es el siguiente: ', { product });
} catch (error) {
    //throw new Error('El producto solicitado no existe')
    console.log(error)
};


try {
    const product = await manager.getProductById(4);
    // return `El producto solicitado es el siguiente: ${product}`
    console.log('El producto solicitado es el siguiente: ', { product });
} catch (error) {
    throw new Error('El producto solicitado no existe')
};


// utilizando deleteProduct
try {
    const deletedProduct = await manager.deleteProduct(2);
    // return `Producto eliminado: ${deletedProduct}`;
    console.log('Producto Eliminado: ', { deletedProduct })
} catch (error) {
    throw new Error('No se pudo eliminar el producto solicitado')
}