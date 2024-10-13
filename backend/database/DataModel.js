const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username : String,
    email : {
        type : String,
        unique : true,
    },
    role : String,
})

const model = new mongoose.model('data', schema)

module.exports = model;