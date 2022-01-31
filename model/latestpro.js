const mongoose = require('mongoose')

const latestSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image:
    {
        type: String
    },
    description: {
        type: String,
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    }
})

module.exports = mongoose.model("latest", latestSchema);