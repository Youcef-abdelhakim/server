import express from 'express';
import {Router} from 'express';
import { categoryCollection } from '../modles/indexS.js';

export default ({config, db}) => {
    let router = Router();

    router.post('/categoryAdd', async(req, res) =>{
        try{
            const body = req.body;
            if(body.category){
                const cat = {
                    category: body.category
                };

                const newcategory = await categoryCollection.create(cat);
                if(newcategory){
                    res.status(200).send({success: true, message: cat});
                } else{
                    res.status(500).send({success: false, message : "failed to creat category, sorry"});
                }
            } else{
                res.status(400).send({success: false, message:'please provide category'});
            }

        }
        catch (err){
            console.error("errore creating category", err);
            res.status(500).send({success:false, message: 'server error retry'});
        }
    });

    router.get('/categoryget', async(req, res) =>{
        try{
            const categorys = await categoryCollection.find({});
            if(categorys.length > 0){
                res.status(200).send({success: true, message:categorys});
            } else{
                res.status(404).message({success: false, message: 'not fount '});
            }
        } catch(error){
            console.error("error catched:", error);
            res.status(500).message({success: false, message:"server problem try later "});
        }
    })
    return router;
}