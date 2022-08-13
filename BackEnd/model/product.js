const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"a product name is required"],
        unique:true
    },
    category:{
        type:String,
        required:[true,"category of the product is required"],
    },
    price:{
        type:Number,
        required:[true,"price of the product is required"],
    },
    discountPrice:{
        type:Number,
        required:[true,"discount price of the product is required"],
    },
    description:{
        type:String,
        required:[true,"description of the product is required"],
    },
    image:{
        type:String,
        required:[true,"Image of the product is required"],
    },
    createdOn:{
        type:Date,
        default: Date.now
    },
    isTopProduct:{
        type:Boolean,
        default:false
    }
},{ versionKey: false });

const ProductModel = mongoose.model('products',productSchema,'products');

module.exports = ProductModel;