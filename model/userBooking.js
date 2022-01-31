const mongoose = require('mongoose')

const userBookingSchema = new mongoose.Schema({
    Day: {
        type: String,
        required: true,
    },
    Date:{
        type: String,
    },
   
    user:{
        type: String,
    }
})
module.exports = mongoose.model('userBooking', userBookingSchema);