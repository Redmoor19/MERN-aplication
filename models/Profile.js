const mongoose = require('mongoose')

const ProfieleSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    secondName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Profile',ProfieleSchema)