import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type: String, require: true
    },
    brand : {
        type : String, require : true
    },
    price : {
        type : String, require : true
    },
    Quantity :{
        type : Number, require : true
    },
    category : {
        type : String, require : true
    },
    image : {
        type: String, require: true
    },
    
});

export default productSchema;