const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 5000;
require('dotenv').config();

app.get ('/', (req,res) =>{
    res.send("server is running")
})

app.listen(port, ()=>{
    console.log("Server Running", port);
})
