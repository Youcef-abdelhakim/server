import { Router } from "express";
import multer from "multer";
import path from 'path';
import { productCollection } from "../modles/indexS.js";


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
            if (body.name && req.file) {
                const product = {
                    name : body.name,
                    image : req.file.path
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

    router.get('/demo/:name', async(req, res) => {
        try {
            const product = await productCollection.findOne({name: req.params.name});
            if(product){
                res.status(200).send({
                    success: true,
                    name : product.name,
                    imageUrl : `http://localhost:8000/${product.image}`
                })
            } else{
                res.status(409).send({ success: false, message : "not fount "});
            }
        } catch(error){
            res.status(500).send({success: false, message : "server problem try later !"});
        }
    })

    return router
}
