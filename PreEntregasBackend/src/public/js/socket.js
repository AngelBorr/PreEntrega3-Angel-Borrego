import ProductManager from "../../productsManager.js";

const manager = new ProductManager;

const updateProducts = async (io) => {
    const products = await manager.getProducts();
    io.emit('updateProducts', products);
    
}

export { updateProducts };