const mongoose = require('mongoose')

const Schema=mongoose.Schema
const responseSchema = new Schema ({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    body:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    
})

const Response = mongoose.model('Response',responseSchema)

module.exports = {
    Response,
    responseSchema
}