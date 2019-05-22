const express=require("express")
const router=express.Router()
const { Tag }=require('../models/Tag')

router.get('/',(req,res) => {
   Tag.find()
   .then((tag) => { res.send(tag) }) 
   .catch((err) => { res.send(err) })
})
router.post('/',(req,res)=> {
    const body=req.body
    const tag=new Tag(body)
    tag.save()
    .then((tag) => { res.send(tag) } )
    .catch((err) => { res.send(err) })
})
router.get('/:id',(req,res)=>{
    const id=req.params.id
    Tag.findById(id)
    .then( (tag) => {
        if(tag) {
            res.send(tag)
        } else{res.send({})}
    })
    .catch((err) => { res.send(err) })
})
router.delete('/:id',(req,res) => {
    const id=req.params.id
    Tag.findByIdAndDelete(id)
    .then((tag) => res.send(tag))
    .catch((err) => {res.send(err)})
})

module.exports = {
    tagsRouter:router
}

