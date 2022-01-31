const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    schoolName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
      
    },
    files:{
        type: String,
        
    },
    gender: {
        type: String,
        
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    googleId: {
        type: String,
    },
    provider: {
        type: String,
        required: true,
    },
    userType: {
        type:String,
        required: true,
    },
    isChecked:{
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('user', userSchema);