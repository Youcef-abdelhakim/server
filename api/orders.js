import { Router } from "express";
import { ordrcollection } from "../modles/indexS.js";

export default ({config, db}) => {
    let router = Router();

    router.post('/ordera', async (req, res) => {
        console.log('Received body:', req.body);
        try {
            const body = req.body;
    
            if(body.firstName 
                && body.lastName 
                && body.email 
                && body.phone
                && body.adress
                && body.deleverypoint
                && body.products
                && body.totalPrice){
                    const order = await ordrcollection.create(body);
    
                    if(order){
                        res.status(201).send({success: true , message: "Order created", order});
                    } else {
                        res.status(500).send({success: false, message: "Failed to create order, try again"});
                    }
                } else {
                    res.status(400).send({success: false, message: "Please provide all required information"});
                }
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).send({success: false, message: "Internal server error"});
        }
    })

    return router;
}