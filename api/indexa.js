import { Router } from "express";
import order from './orders.js';

export default ({config, db}) => {
    let api = Router();
    console.log("Order Middleware:", order);
    
    api.use('/order', order({config, db}));

    return api;
}