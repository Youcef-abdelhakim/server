import express from 'express'
import Config from './config.json' assert {type : 'json'}
import mongoose from 'mongoose'
import api from './api/indexa.js'
import cors from 'cors'

const app = express();
const port = Config.port;

app.use(cors({
    origin : Config.corsOrigin,
    optionsSuccessStatus: 200,
}))

app.options('*', cors());

mongoose
    .connect(Config.mongo_url)
    .then((db) => {
        console.log("connected to the database");
        app.use(express.json())
        console.log(api,"hi there");
        app.use('/api', api({config : Config, db}))

        app.listen(port, ()=> {
            console.log("server run on the used port");
        })
    })

    .catch((err) => {
        console.log(err, "received an error");
    })