import mongoose from 'mongoose'
import orderSchema from './schemas/orderSchema.js';

export const ordrcollection = mongoose.model("orders", orderSchema);