const express=require('express')
const router =express.Router()
const { authenticateUser }=require('../middlewares/authentication')
const { Story } = require('../models/Story')

router.get('/',(req,res) => {
    Story.find()
    .then((stories)=> {
        // console.log(stories)
        res.send(stories) })
    .catch((err) => { res.send(err) })
})
router.get('/login/:id',(req,res)=> {
    
})

router.get('/:id',(req,res)=> {
    const id=req.params.id
    Story.findById(id).populate('tags').populate('topic').populate('user').populate('responses.user')
    .then((story)=>res.send(story))
    .catch(err=>console.log(err))
})

module.exports = {
    publicRouter:router
}