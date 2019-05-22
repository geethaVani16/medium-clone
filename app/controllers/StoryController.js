const express=require('express')
const multer =require('multer')
const router =express.Router()
const { authenticateUser }=require('../middlewares/authentication')
const { Story } = require('../models/Story')



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename:function(req,file, cb){
        cb(null,  file.originalname)
    }  
})

const fileFilter = (req,file, cb) => {
    //to reject a file if it is not of proper format

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else{
        cb(null, false)
    }  
}

const upload = multer({
    storage : storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})

router.get('/', authenticateUser, (req,res) => {
    Story.find({ user:req.user._id })
    .then( (story) => { res.send(story) })
    .catch((err) => { res.send(err) })
})

router.post('/',upload.single('image'),authenticateUser, (req,res) => {
    // console.log(req.file,"req.file")
   const imageUrl = "http://localhost:3005"+req.file.destination.slice(1,(req.file.destination.length))+req.file.filename

   const story=new Story ({
       title:req.body.title,
       body:req.body.body,
       topic:req.body.selectedTopic,
       tags:req.body.tagOptions,
       image:imageUrl
   })
   console.log('story',story)
   story.user=req.user._id
   story.save()
   .then(function(story){
       console.log(story)
        res.send(story)
    
    })
    .catch(function(err){
        res.send(err)
    })


    // const body=req.body
    // console.log(body,'body')
    // const story=new Story(body)
    // story.user=req.user._id
    // story.tags = body.tagOptions
    // story.topic = body.selectedTopic
    // story.image=imageUrl
    // console.log(story,'story before save')
    // story.save()
    // .then( (story) => {res.send(story) })
    // .catch((err) => {res.send(err) })
})

// router.post('/:id/claps',authenticateUser,(req,res) => {
//     const {claps}=req.body
//     // const id=req.params.id
//     console.log('story',req.user)
//     console.log(id,'storyId')
//     console.log(claps,'body')

//     Story.findOne({
//         id:req.user._id,
//     })
//     console.log(req.user._id,'user')
//     // .then((story) => {
//     //     console.log(story)
//     //     res.send(story)
//     // })
//     // .catch((err)=>res.send(err))
// })



router.get('/:id', authenticateUser, (req,res) => {
    const id=req.params.id
    Story.findOne({
        user:req.user._id,
        _id:id
    }).populate('user').populate('tags').populate('topic').populate('responses.user')
    .then((story) => { 
        if(story) {
            console.log("Inside if")
            res.send(story)
        }
        else{
            console.log("Outside if")
            res.send({})
         } 
    })
    .catch((err) => { res.send(err) })
})





router.delete('/:id', authenticateUser, (req,res) => {
    const id=req.params.id
    Story.findOneAndDelete({
        user:req.user._id,
        _id:id 
    })
    .then((story)=> res.send(story))
    .catch((err) => { res.send(err) })   
})
router.put('/:id',authenticateUser, (req,res) => {
    const id=req.params.id
    const body=req.body
    Story.findOneAndUpdate({
        user:req.user._id,
        _id:id
    }, {$set:body}, {new:true,runValidators:true} )
    .then((story)=> res.send(story))
    .catch((err) => { res.send(err) })
    
})

module.exports={
    storiesRouter:router
}