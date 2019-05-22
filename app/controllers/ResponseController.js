const express=require('express')
const router =express.Router()
const { authenticateUser } =require('../middlewares/authentication')
const { Response } = require('../models/Response')
const { Story } =require('../models/Story')

router.get('/:id',(req,res) => {
    const id =req.params.id
    Story.findById(id).populate('responses.user')
    .then((story) => { res.send(story.responses) })
    .catch((err) => { res.send(err) })
})

router.post('/:id',authenticateUser,(req,res) => {
    const body=req.body
    const id = req.params.id
    const response = new Response(body)
    response.user =req.user._id
    // console.log(body,'body')
    Story.findById(id)
        .then((story) => {
            story.responses.push(response)
            story.save()
                .then(story => res.send(story.responses))
                .catch(err => res.send(err))
        })
        .catch((err)=> console.log(err))
    // response.save()
    // .then( (response) => { res.send(response)})
    // .catch((err) => { res.send(err) })  
})

router.delete('/:id',authenticateUser,(req,res) => {
    const id =req.params.id
    Response.findByIdAndDelete(id)
    .then((response) => res.send(response))
    .catch((err) => { res.send(err) })
})
router.put("/:id",authenticateUser,(req,res) => {
    const id=req.params.id
    const body=req.body
    Response.findByIdAndUpdate(id,{$set:body},{new:true,runValidators:true})
    .then((response) => { res.send(response) })
    .catch((err) => { res.send(err) })   
})

module.exports = {
    responseRouter:router
}