const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId

const app = express()

const port = process.env.PORT || 5000

//midleware

app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://visitbd:zXFcAaswUPmjZmjM@cluster0.svurl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const serviceColection = client.db("VistBD").collection("Services");

    app.get("/", (req, res) => {
        console.log("ami home teke")
    
    })

    
    //get all service
    app.get('/services',async(req,res)=>{
        const cursor = serviceColection.find({})
        const result = await cursor.toArray()
        res.send(result)
        // console.log(result)
      })
  
        //get one from service

    //  app.get('/services/:id',async(req,res)=>{
    //     const id = req.params.id
    //     console.log(id)
    //     if(id){
    //     const query = { _id: ObjectId(id) }
    //     const result = await serviceColection.findOne(query)
    //     res.send(result)
    //     // console.log(result)
  
    //     }
        
    //   })

      //add service  by post method
    app.post('/services',async(req,res)=>{

        const newService = req.body;
        console.log(newService)
  
        const result = await serviceColection.insertOne(newService)
        res.send(result)
        console.log(result)
  
      })
  
  
    // perform actions on the collection object
    //   client.close();

    console.log("hello")

});


app.listen(port, () => {
    console.log("litening from", port);
})