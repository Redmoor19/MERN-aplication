const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    updated:{
        type: Boolean,
        default: false
    },
    isWorthy:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema);