const mongoose = require('mongoose');

const ConnectToDatabase = async function(url){
    try{
        console.log("connecting to database...");
        await mongoose.connect(url)
        console.log('Connected to database');
    }
    catch(error){
        console.error(error)
    }
}

module.exports = ConnectToDatabase

