import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products';

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    thumbnail:{
        type: String, // por ahora string mas adelante file
        required: true,
    },
    code:{
        type: String,
        required: true,
        unique: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    status:{
        type: Boolean,
        required: true,
    },
    category:{
        type: String, 
        required: true,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }    

});

productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productSchema);

export default productsModel