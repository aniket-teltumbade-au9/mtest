const express = require('express')
const MongoClient=require('mongodb').MongoClient
const bodyParser=require('body-parser')
const cors=require('cors')
const app= express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
const connectionString='mongodb+srv://aniket:PjXbLtzp9AUiDH5I@cluster0.jrvn4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const port=process.env.Port || 8000

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
      let db=client.db('myFirstDatabase')
    app.post('/',(req,res)=>{
        db.collection('coupans').insertOne(req.body,(err,result)=>{
            res.send(result)
        })
        
    })
    app.get('/',(req,res)=>{
        db.collection('coupans').find({}).toArray((err,result)=>{
            res.send(result)
        })
    })
  })
  .catch(error => console.error(error))

app.listen(8000,()=>{
    console.log(`listening ${port}`)
})