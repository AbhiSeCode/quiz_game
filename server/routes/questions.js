const express= require('express')
const Question = require('../models/question')
const router = express.Router()


router.get('/', (req,res)=>{
    res.status(200).send('Route working')
})

router.post('/setquestion',async (req,res)=>{
    const question = new Question(req.body)
    await question.save()
    res.status(200).send('data entered')
})


router.get('/getquestions', async(req,res)=>{
    try{
        const questions = await Question.find({})
        res.status(200).send(questions)
    }catch(error){
        res.status(400).send(error.message)
    }
})

module.exports= router