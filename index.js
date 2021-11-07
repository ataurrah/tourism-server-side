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




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.svurl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const serviceColection = client.db("VistBD").collection("Services");
    const ordersColection = client.db("VistBD").collection("orders");

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

     app.get('/services/:id',async(req,res)=>{
        const id = req.params.id
        console.log(id)
        if(id){
        const query = { _id: ObjectId(id) }
        const result = await serviceColection.findOne(query)
        res.send(result)
        // console.log(resul)
  
        }
        
      })

      //add service  by post method
    app.post('/services',async(req,res)=>{

        const newService = req.body;
        console.log(newService)
  
        const result = await serviceColection.insertOne(newService)
        res.send(result)
        // console.log(result)
  
      })

app.post('/orders',async(req,res)=>{
  console.log("from orders post");
  const newOrder = req.body;
  const result = await ordersColection.insertOne(newOrder)
  res.send(result)
  console.log(result);
})
  

app.get('/orders',async(req,res)=>{
  const result = await ordersColection.find({}).toArray()
  res.send(result)
})

app.get('/orders/:email',async(req,res)=>{
  const email = req.params.email;
  const result = await ordersColection.find({emial:email}).toArray()
  res.send(result)
  console.log(result);
})

app.put('/orders/:id',async(req,res)=>{
  const id = req.params.id
  const filter = { _id: ObjectId(id) };
  
  const options = { upsert: true };

  const updateDoc = {
    $set: {
      approved:true
    },
  };
  const result = await ordersColection.updateOne(filter, updateDoc, options);


})

app.delete('/orders/:id',async(req,res)=>{
  const id = req.params.id
  const deleteID = {_id:ObjectId(id)}
  const result = await ordersColection.deleteOne(deleteID)
  res.send(result)
  console.log(result);
})

  
  
    // perform actions on the collection 
    //   client.close();

    console.log("hello")

});


app.listen(port, () => {
    console.log("litening from", port);
})
