
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.MONGO_URI;

// const uri = "mongodb+srv://learnwiseUser:qZeWITPugtFkcP2w@cluster0.vdlk0az.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
     const db = client.db('learnwise-db')
     const courseCollection = db.collection('courseData')

     app.get('/courseData', async (req, res) => {

      const result = await courseCollection.find().toArray()
     
      res.send(result)
     })







  
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


// Example route
app.get('/', (req, res) => {
  res.send("Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
