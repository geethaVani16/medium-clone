const mongoose = require('mongoose')
const { responseSchema } =require('../models/Response')

const Schema=mongoose.Schema
const storySchema =new Schema ({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    },
    isPublished:{
        type:Boolean
    },
    publishedDate:{
        type:Date
    },
    claps:{
        type:Number
    },
    image:{
        type:String,
        required:true
    },
    tags:[{
            type: Schema.Types.ObjectId,
            ref:'Tag'
        }],
    responses:[ responseSchema ]
    
})

// storySchema.post('save',function(next){
//     const story=this
//     if(story.isNew) {
//         console.log(story)
//         .then(function(story){
//             story.save()
//             .then(function(){
//                 res.send(story)
//                 next()
//             })
//         })
//     }
// })

const Story =mongoose.model('Story',storySchema)
module.exports = {
    Story
}
