const mongoose = require('mongoose');


const equipmentSchema = new mongoose.Schema({
    equipmentName: {
        type: String,
        required: true,
    },
    image: {
        type:String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    }
}) 
module.exports = mongoose.model('equipment', equipmentSchema);