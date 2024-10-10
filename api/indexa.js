import { Router } from "express";
import order from './orders.js';
import product from "./product.js";

export default ({config, db}) => {
    let api = Router();
    console.log("Order Middleware:", order);
    
    api.use('/order', order({config, db}));
    api.use('/products', product({config, db}));

    return api;
}