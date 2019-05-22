const express=require('express')
const router=express.Router()
const { User }=require('../models/User')
const { authenticateUser } = require('../middlewares/authentication.js')

//localhost:3000/users/register
router.post("/register", function(req,res){
    const body=req.body
    const user = new User(body)
    //console.log(user.isNew)//true 
    //before saving the record user is new so it returns true
    user.save()
    .then(function(user){
        //console.log(user.isNew) //false
        //after saving the record is old so it returns false
        res.send(user)
    })
    .catch(function(err){
        res.send(err)
    })
    
})


//localhost:3000/users/login
router.post('/login',function(req,res){
    const body=req.body
    User.findByCredentials(body.email,body.password)
    .then(function(user){
        return user.generateToken() //it will instance method 
    })
    .then(function(token){
        res.send({token})
    })
    .catch(function(err){
        res.status(404).send(err)
    })

})
router.post('/bookmark',authenticateUser,function(req,res){
    const  { storyId } = req.body
    User.findOne({
        _id: req.user._id
    })
    .then((user)=>{
        console.log(user.bookmark,'user')
        user.bookmark.push(storyId)
        user.save()
        .then(user => res.send(user.bookmark))
        .catch(err=>res.send(err))
    })
    .catch(err=>res.send(err))
})
router.get('/bookmark',authenticateUser,(req,res) => {
    User.findOne({
        _id: req.user._id,
    }).populate('bookmark')
    .then(user => {
        console.log(req.user)
        res.send(user)
    })
    .catch(err=>res.send(err))
    
})
router.post('/follow', authenticateUser, function(req,res) {
    const id= req.body.id
    console.log('id is story user_id',id)
    User.updateOne( { _id:req.user._id }, {$push:{following : id} }).populate('following').populate('followers')
    .then(function (user) {
        res.send(user)
    })
    .catch((err)=>console.log(err))

    User.updateOne( {_id:id }, {$push:{ followers:req.user._id } }).populate('following').populate('followers')
    .then(function (user)  {
        res.send(user)
    })
    .catch((err)=>console.log(err))

})


//localhost:3000/users/account
router.get('/account',authenticateUser, function(req,res){
    const { user }= req
    //console.log(req)
   // user.stories=req.story._id
    res.send(user)
})
//for getting particular user details
router.get('/:id',function(req,res) {
    const id=req.params.id
    User.findById(id)
    .then(function (user){
        res.send(user)
    })
    .catch(function(err){
        res.send(err)
    })
})

//localhost:3000/users/logout
router.delete('/logout',authenticateUser,function(req,res){
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: {token: token }}})
    .then(function(){
        res.send({ notice:"successfully logged out" })
    })
    .catch(function(err){
        res.send(err)
    })
})



module.exports={
    usersRouter:router
} 