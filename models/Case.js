const mongoose = require('mongoose');

const CaseSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    disease:{
        type: String,
        required: true
    },
    recipe:{
        type: String,
        required: true
    },
    information:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Case', CaseSchema);