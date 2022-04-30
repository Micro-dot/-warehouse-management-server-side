const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qp1lk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log("Connected")
async function run() {
    try {
        await client.connect();
        const bookItemCollection = client.db('books').collection('items');
        // Data load in mongodb Server
        app.get('/items', async (req, res) => {
            const query = {}
            const cursor = bookItemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items)
        });

        // Get post by individual ID
        app.get('/items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const items = await bookItemCollection.findOne(query);
            res.send(items);
        })

        // Data Post in My UI
        app.post('/items', async (req, res) => {
            const allItems = req.body;
            const result = await bookItemCollection.insertOne(allItems);
            res.send(result);
        })

        app.put('/items/:id', async (req, res) => {
            const id = req.params.id;
            const updateQuantity = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: updateQuantity.quantity
                }
             }
            const result = await bookItemCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("server is running")
})

app.listen(port, () => {
    console.log("Server Running", port);
})
