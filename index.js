const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 4000



app.use(cors());
app.use (express.json());

app.get('/', (req, res) => {
    res.send('this server is runing fine')
})




const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.rfaan6v.mongodb.net/?retryWrites=true&w=majority`;

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

            const database = client.db('bookCollege')
            const allCollege = database.collection('allCollege')
            const admissionList = database.collection('admissionList')
            

            app.get('/college',async(req,res) => {
               const result = await allCollege.find().limit(3).toArray();
                res.send(result)
            })

            app.get('/allColleges',async(req,res) => {
                const result = await allCollege.find().toArray();
                res.send(result)
            })

            app.get('/collegeDetails/:_id',async(req,res) => {
                const id = req.params._id;
                const query = {_id: new ObjectId(id)}
                const result = await allCollege.findOne(query)
                res.send(result)
            })

            app.post('/admission',async(req,res) => {
                const data = req.body;
                const result = await admissionList.insertOne(data);
                res.send(result)
              })

            // app.post('/admissionlist',async(req,res) => {
            //     const data = req.body;
            //     const result =await admissionList.insertOne(data);
            //     res.send(result);
            // })

         
           
            // await client.connect();
            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
        }
    }
run().catch(console.dir);


app.listen(port, () => {
    console.log(`this server runing port ${port}`)
})