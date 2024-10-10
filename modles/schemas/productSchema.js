import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    image : {
        type: String,
        require: true
    },
    
});

export default productSchema;