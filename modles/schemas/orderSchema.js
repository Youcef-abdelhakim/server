import mongoose from 'mongoose';



const orderSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName:  {type: String, required: true},
    email : {type: String, required: true},
    phone: {type: Number, required: true},
    adress: {type: String, required: true},
    deleverypoint: {type: String, required: true},
    // products : [
    //     {
    //         prodName: {type: String, required: true},
    //         prodBrand: {type: String, required: true},
    //         prodPrice: {type: String, required: true},
    //     }
    // ],

    totalPrice : {type: Number, required: true}
    
});

export default orderSchema;