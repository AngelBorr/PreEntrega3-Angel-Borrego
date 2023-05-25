import ProductManager from "./productsManager.js";

const manager = new ProductManager

//agregando productos al json
try {
    await manager.addProduct({        
        title: "Remera",
        description: "Remera 100% algodon \n colores: Blanco, Negro, Azul y Amarillo \n Talles: XXL, XL, L, M y S",
        price: 1500,
        thumbnail: "Sin imagen",
        code: "R-123",
        stock: 20
    });
} catch (error) {
    console.log(error);
    //throw new Error('Se produjo al cargar el producto', error);
}

try {
    await manager.addProduct({
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
    const id = 2
    let product = manager.getProductById(id);
    const updatedProduct = manager.updateProduct(id, { price: 8500 });
    console.log(`Producto actualizado: ${updatedProduct}`);
} catch (error) {
    throw new Error(`la actualizacion del producto no se pudo realizar:  ${error.message}`)
}

try {
    const id = 4
    let product = manager.getProductById(id);
    const updatedProduct = manager.updateProduct(id, { price: 8500 });
    console.log(`Producto actualizado: ${updatedProduct}`);
} catch (error) {
    throw new Error(`la actualizacion del producto no se pudo realizar:  ${error.message}`)
}


//utilizando getProductById
try {
    const product = manager.getProductById(2);
    console.log (`El producto solicitado es el siguiente: ${product}`)
} catch (error) {
    throw new Error('El producto solicitado no existe')
};

try {
    const product = manager.getProductById(4);        
    console.log(`El producto solicitado es el siguiente: ${product}`)
} catch (error) {
    throw new Error('El producto solicitado no existe')
};

// utilizando deleteProduct

try {
    const deletedProduct = await manager.deleteProduct(2);
    console.log(`Producto eliminado: ${deletedProduct}`);
} catch (error) {
    throw new Error('No se pudo eliminar el producto solicitado')
}
