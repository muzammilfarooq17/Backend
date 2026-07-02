const mongoose = require('mongoose');


async function connectDB(){
    await mongoose.connect('mongodb://Backend:lOCHl2HAgXgo7R1t@ac-fraq5mx-shard-00-00.gnippgw.mongodb.net:27017,ac-fraq5mx-shard-00-01.gnippgw.mongodb.net:27017,ac-fraq5mx-shard-00-02.gnippgw.mongodb.net:27017/project1?replicaSet=atlas-muug5h-shard-0&ssl=true&authSource=admin')

    console.log('DataBAse Connected');
    
}


module.exports = connectDB;