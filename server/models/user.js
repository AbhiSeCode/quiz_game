const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    questions:[{
        type: mongoose.Mixed,
        required:true
    }],
    scores:[{
        type: mongoose.Mixed
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User