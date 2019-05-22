//npm install --save express
const express=require('express')
const cors=require('cors')
const multer=require('multer')
const { mongoose }=require('./config/database')
const {usersRouter}=require('./app/controllers/UsersControllers')
const {topicsRouter}=require('./app/controllers/TopicController')
const {storiesRouter}=require('./app/controllers/StoryController')
const { publicRouter } =require('./app/controllers/PublicController')
const {tagsRouter}=require('./app/controllers/TagController')
const {responseRouter}=require('./app/controllers/ResponseController')

const app=express()

const port= 3005

app.use(express.json())
app.use(cors())

app.get('/',function(req,res){
    res.send('<h2> welcome to medium </h2>')
})

app.use('/users',usersRouter)
app.use('/topics',topicsRouter)
app.use('/uploads',express.static(__dirname + '/uploads'))
app.use('/stories',storiesRouter)
app.use('/public',publicRouter)
app.use('/tags',tagsRouter)
app.use('/responses',responseRouter)



app.listen(port,function(){
    console.log('listing on port',port)
})