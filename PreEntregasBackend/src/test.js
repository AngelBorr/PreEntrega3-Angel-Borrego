import ProductManager from "./productsManager.js";

const manager = new ProductManager

//agregando productos al json
try {
    const product1 = manager.addProduct({
        title: "Remera",
        description: "Remera 100% algodon \n colores: Blanco, Negro, Azul y Amarillo \n Talles: XXL, XL, L, M y S",
        price: 1500,
        thumbnail: "Sin imagen",
        code: "R-123",
        stock: 20
    });
} catch (error) {
    throw new Error('Se produjo al cargar el producto')
}

try {
    const product2 = manager.addProduct({
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
    const product3 = manager.addProduct({
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
    const product3 = manager.addProduct({
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
(async () => {
    try {
        await manager.getProducts();
        const updatedProduct = await manager.updateProduct(2, { price: 8500 });
        return `Producto actualizado: ${updatedProduct}`;
    } catch (error) {
        throw new Error('la actualizacion del producto no se pudo realizar')
    }
})();

(async () => {
    try {
        await manager.getProducts();
        const updatedProduct = await manager.updateProduct(4, { stock: 10 });
        return `Producto actualizado: ${updatedProduct}`;
    } catch (error) {
        throw new Error('la actualizacion del producto no se pudo realizar')
    }
})();

//utilizando getProductById
(async () => {
    try {
        const product = manager.getProductById(2);
        return `El producto solicitado es el siguiente: ${product}`
    } catch (error) {
        throw new Error('El producto solicitado no existe')
    };
})();

(async () => {
    try {
        const product = manager.getProductById(4);        
        return `El producto solicitado es el siguiente: ${product}`
    } catch (error) {
        throw new Error('El producto solicitado no existe')
    };
})();

// utilizando deleteProduct
(async () => {  
    try {
        const deletedProduct = manager.deleteProduct(2);
        return `Producto eliminado: ${deletedProduct}`;
    } catch (error) {
        throw new Error('No se pudo eliminar el producto solicitado')
    }
})();