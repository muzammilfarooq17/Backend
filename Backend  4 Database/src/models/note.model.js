const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
    title:String,
    description:String,
    age:Number,                                         // 4) Note Schema create krna 
    degree:String,
})


const noteModel = mongoose.model("note" , noteSchema);
module.exports = noteModel;