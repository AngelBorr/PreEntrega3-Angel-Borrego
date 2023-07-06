import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: {
        type:[{
            product:{
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                default: 0,
            } 
        }], 
        default: []
    }

});

const cartsModel = mongoose.model(cartsCollection, cartSchema)

export default cartsModel