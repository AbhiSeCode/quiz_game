const express= require('express')
const path= require('path')
const cors = require('cors')
const mongoose =  require('mongoose')
const questionsRoute= require('./routes/questions')
const userRoute = require('./routes/user')
require('dotenv').config()
const port = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(cors())


app.use(express.static(path.join(__dirname, '../build')))

const atlas_uri = process.env.DATABASE_URL 
mongoose.connect(atlas_uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true, useFindAndModify:false})
const connection = mongoose.connection
connection.once('open',()=>{
    console.log('db connected')
})

app.use('/questions', questionsRoute)
app.use('/user', userRoute)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, ()=>{
    console.log(`Running on port number ${port}`)
})