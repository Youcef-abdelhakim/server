import express from 'express'
import { Router } from "express";
import multer from "multer";
import path from 'path';
import { productCollection } from "../modles/indexS.js";
import { log } from 'console';


const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage});

export default ({config, db}) => {
    let router = Router();

    router.post('/upload', upload.single('image'), async (req, res) => {
        console.log('received body', req.body);

        try{
            const body = req.body;
            if (body.name &&
                body.brand &&
                body.price &&
                body.Quantity &&
                body.category &&
                 req.file) {
                const product = {
                    name : body.name,
                    brand : body.brand,
                    price : body.price,
                    Quantity: body.Quantity,
                    category : body.category,
                    image: req.file.path.replace(/\\/g, '/')
                };

                const newproduct = await productCollection.create(product);

                if(newproduct){
                    res.status(201).send({ success : true, message : product});
                } else{
                    res.status(499).send({ success : true, message : "failed to creat you new product sorry"});
                }
            } else{
                res.status(400).send({success : false, message : "please provide all the informations "});
            }
        } catch (err) {
            console.error("errore creating yoyour product", err);
            res.status(500).send({ success: false, message : "server error retry!"})
        }
    });

    router.get('/demo/:filter/:value', async(req, res) => {

        const value = req.params.value;
        const filter = req.params.filter;
        const query  = filter === 'name' ? {'name' : value} : {'category' : value}

        try {
            const products = await productCollection.find(query);
            if(products && products.length > 0){
                console.log(products);
                res.status(200).send({
                    success: true,
                    products
                })
            } else{
                res.status(409).send({ success: false, message : "not fount "});
            }
        } catch(error){
            console.error("error catched!", error);
            res.status(500).send({success: false, message : "server problem try later !"});
        }
    })

    

    return router
}
