const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/createquiz', async (req,res)=>{
    try{
        const user = new User(req.body)
        await user.save()
        res.status(201).send({userID: user._id})
    }catch(error){
        res.status(400).send(error.message)
    }
})

router.get('/getquiz', async(req,res)=>{
    try{
        const user = await User.find({_id: req.query.user})
        res.status(200).send(user[0])
    }catch(error){
        res.status(400).send('Invalid Quiz')
    }
})


router.get('/getscores', async(req,res)=>{
    try{
        const user = await User.find({_id: req.query.user})
        res.status(200).send(user[0].scores)
    }catch(error){
        res.status(400).send('User not found')
    }
})

router.put('/setscore', async(req,res)=>{
    try {
        const user= await User.find({_id: req.body.id})
        user[0].scores.push(req.body.score)
        user[0].save()
        res.status(200).send(user)
    }catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router