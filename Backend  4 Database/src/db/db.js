const mongoose = require('mongoose');  //3) server ko database sai connect Krna 

async function connectDB(){
    await mongoose.connect("mongodb://Backend:lOCHl2HAgXgo7R1t@ac-fraq5mx-shard-00-00.gnippgw.mongodb.net:27017,ac-fraq5mx-shard-00-01.gnippgw.mongodb.net:27017,ac-fraq5mx-shard-00-02.gnippgw.mongodb.net:27017/halley?replicaSet=atlas-muug5h-shard-0&ssl=true&authSource=admin")
    console.log('connected to database');

}
module.exports =  connectDB






