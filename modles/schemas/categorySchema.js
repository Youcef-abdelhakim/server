import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category : {type: String, required: true}
});

export default categorySchema;