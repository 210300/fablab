const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    equipment: {
        type: String,
        required: true,
    },
    times: {
        type: String,
        
    },
    date: {
        type: String,
        required: true,
    },
    
    row: {
        type: Number,
        required:true
    },
    col: {
        type: Number,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    type:{
        type: String,
    }
    
},{
    timestamps:true,
});

module.exports = mongoose.model('booking', bookingSchema);