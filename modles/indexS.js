import mongoose from 'mongoose'
import orderSchema from './schemas/orderSchema.js';
import productSchema from './schemas/productSchema.js';

export const ordrcollection = mongoose.model("orders", orderSchema);
export const productCollection = mongoose.model("products", productSchema);

