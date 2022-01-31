const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
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
    isVerified: {
        type: Boolean,
        default: false,
    },
    
});

module.exports = mongoose.model('admin', adminSchema);