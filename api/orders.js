import { Router } from "express";
import { ordrcollection } from "../modles/indexS.js";

export default ({config, db}) => {
    let router = Router();

    router.post('/ordera', async (req, res) => {
        const body = req.body;

        if(body.firstName 
            && body.lastName 
            && body.email 
            && body.phone
            && body.adress){
                const order = await ordrcollection.create(body);

                if(order){
                    res.send({success: true , message: "order created ", order});
                }else{
                    res.send({success : false, message: "try again"});
                }
            }else{
                res.send({success: false, message:"please send your information"})
            }
    })

    return router;
}