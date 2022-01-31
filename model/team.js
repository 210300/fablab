var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const teamSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: "superfablab"
      
    },
    machine: {
        type: String,
        required:true
    },
    token:{
        type: String,
      
    }
});

module.exports = mongoose.model('team', teamSchema);