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
    doctorId:{
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
    comments :[{person:{type: String},
                body:{type: String},
                date:{type: Date, default: Date.now()}
                }],
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Case', CaseSchema);